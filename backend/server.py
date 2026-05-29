from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from bson import ObjectId


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
    """Create a new booking request"""
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
async def get_bookings(status: Optional[str] = None):
    """Get all bookings with optional status filter"""
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
async def update_booking_status(booking_id: str, booking_update: BookingUpdate):
    """Update booking status (admin action)"""
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
async def delete_booking(booking_id: str):
    """Delete a booking (admin action)"""
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