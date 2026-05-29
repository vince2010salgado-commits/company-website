from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import bcrypt
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Booking Models
class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    services: List[str]
    message: Optional[str] = ""

class BookingUpdate(BaseModel):
    status: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Helper function to convert MongoDB document to dict
def booking_helper(booking) -> dict:
    return {
        "id": str(booking["_id"]),
        "name": booking["name"],
        "email": booking["email"],
        "phone": booking["phone"],
        "services": booking["services"],
        "message": booking.get("message", ""),
        "status": booking.get("status", "pending"),
        "date": booking.get("date"),
        "createdAt": booking.get("createdAt"),
        "updatedAt": booking.get("updatedAt")
    }


# ===== Auth helpers =====
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24 * 7  # 1 week

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "type": "access"
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)

async def get_current_admin(request: Request):
    """Dependency to verify admin JWT token from Authorization header."""
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header[7:]
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email or payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        admin = await db.admins.find_one({"email": email})
        if not admin:
            raise HTTPException(status_code=401, detail="Admin not found")
        return {"email": admin["email"]}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Booking Routes
@api_router.post("/bookings", status_code=201)
async def create_booking(booking: BookingCreate):
    """Create a new booking request (PUBLIC - no auth required)"""
    # Validate at least one service is selected
    if not booking.services or len(booking.services) == 0:
        raise HTTPException(status_code=400, detail="At least one service must be selected")
    
    # Create booking document
    booking_dict = booking.model_dump()
    booking_dict["status"] = "pending"
    booking_dict["createdAt"] = datetime.now(timezone.utc)
    booking_dict["updatedAt"] = datetime.now(timezone.utc)
    booking_dict["date"] = None
    
    # Insert into database
    result = await db.bookings.insert_one(booking_dict)
    
    # Fetch the created booking
    created_booking = await db.bookings.find_one({"_id": result.inserted_id})
    
    return {
        "success": True,
        "message": "Booking request submitted successfully",
        "booking": booking_helper(created_booking)
    }


@api_router.get("/bookings")
async def get_bookings(status: Optional[str] = None, admin: dict = Depends(get_current_admin)):
    """Get all bookings (ADMIN ONLY)"""
    query = {}
    if status and status in ["pending", "approved", "completed", "declined"]:
        query["status"] = status
    
    bookings = await db.bookings.find(query).sort("createdAt", -1).to_list(1000)
    
    return {
        "success": True,
        "count": len(bookings),
        "bookings": [booking_helper(booking) for booking in bookings]
    }


@api_router.patch("/bookings/{booking_id}")
async def update_booking_status(booking_id: str, booking_update: BookingUpdate, admin: dict = Depends(get_current_admin)):
    """Update booking status (ADMIN ONLY)"""
    # Validate status
    valid_statuses = ["pending", "approved", "completed", "declined"]
    if booking_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    # Validate ObjectId
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking ID")
    
    # Update booking
    result = await db.bookings.update_one(
        {"_id": obj_id},
        {
            "$set": {
                "status": booking_update.status,
                "updatedAt": datetime.now(timezone.utc)
            }
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Fetch updated booking
    updated_booking = await db.bookings.find_one({"_id": obj_id})
    
    return {
        "success": True,
        "message": "Booking status updated successfully",
        "booking": booking_helper(updated_booking)
    }


@api_router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, admin: dict = Depends(get_current_admin)):
    """Delete a booking (ADMIN ONLY)"""
    # Validate ObjectId
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking ID")
    
    # Delete booking
    result = await db.bookings.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    return {
        "success": True,
        "message": "Booking deleted successfully"
    }


# ===== Auth Routes =====
@api_router.post("/auth/login")
async def admin_login(credentials: LoginRequest):
    """Admin login - returns JWT token"""
    email = credentials.email.lower()
    admin = await db.admins.find_one({"email": email})
    if not admin or not verify_password(credentials.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token(email)
    return {
        "success": True,
        "token": token,
        "admin": {"email": email}
    }


@api_router.get("/auth/me")
async def get_me(admin: dict = Depends(get_current_admin)):
    """Verify current admin session"""
    return {"success": True, "admin": admin}


# ===== Startup: seed admin =====
async def seed_admin():
    """Create or update admin user on startup (idempotent)"""
    admin_email = os.environ.get("ADMIN_EMAIL", "").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    if not admin_email or not admin_password:
        logger.warning("ADMIN_EMAIL or ADMIN_PASSWORD missing - skipping admin seed")
        return
    
    existing = await db.admins.find_one({"email": admin_email})
    if existing is None:
        await db.admins.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "created_at": datetime.now(timezone.utc)
        })
        logger.info(f"Created admin account: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.admins.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info(f"Updated admin password: {admin_email}")


@app.on_event("startup")
async def startup_event():
    await seed_admin()

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()