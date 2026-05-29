# Fresh Start Property Care - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for connecting the frontend booking system with the FastAPI backend and MongoDB database.

## Current Mock Data (to be replaced)

### In `/app/frontend/src/mock.js`:
- `companyInfo` - Company details (KEEP - static data, no backend needed)
- `services` - Service offerings (KEEP - static data, no backend needed)
- `testimonials` - Customer reviews (KEEP - static data, can move to DB later if needed)
- `galleryItems` - Before/after gallery (KEEP - static data, images to be added later)
- **`mockBookings`** - REMOVE: Sample booking data (will come from database)

### In Components:
- `/app/frontend/src/pages/Booking.jsx` - Uses **localStorage** to store bookings (REPLACE with API call)
- `/app/frontend/src/pages/AdminDashboard.jsx` - Reads from **localStorage** and mockBookings (REPLACE with API calls)

---

## Database Schema

### MongoDB Collection: `bookings`

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  services: Array of Strings (required, min 1 service),
  message: String (optional),
  status: String (enum: ['pending', 'approved', 'completed', 'declined'], default: 'pending'),
  date: Date (optional - scheduled appointment date),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## API Endpoints

### 1. Create Booking (Customer Submission)
**Endpoint:** `POST /api/bookings`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "832-291-9876",
  "services": ["Gutter Cleaning", "Power Washing"],
  "message": "Need service ASAP"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking request submitted successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "832-291-9876",
    "services": ["Gutter Cleaning", "Power Washing"],
    "message": "Need service ASAP",
    "status": "pending",
    "createdAt": "2026-05-29T10:30:00Z"
  }
}
```

---

### 2. Get All Bookings (Admin Dashboard)
**Endpoint:** `GET /api/bookings`

**Query Parameters (Optional):**
- `status` - Filter by status (pending, approved, completed, declined)

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "bookings": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "832-291-9876",
      "services": ["Gutter Cleaning", "Power Washing"],
      "message": "Need service ASAP",
      "status": "pending",
      "date": null,
      "createdAt": "2026-05-29T10:30:00Z",
      "updatedAt": "2026-05-29T10:30:00Z"
    }
  ]
}
```

---

### 3. Update Booking Status (Admin Action)
**Endpoint:** `PATCH /api/bookings/:id`

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439011",
    "status": "approved",
    "updatedAt": "2026-05-29T11:00:00Z"
  }
}
```

---

### 4. Delete Booking (Admin Action)
**Endpoint:** `DELETE /api/bookings/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

---

## Frontend Integration Plan

### 1. Booking Form (`/app/frontend/src/pages/Booking.jsx`)

**Current Implementation:**
```javascript
// MOCK: Stores to localStorage
localStorage.setItem('bookings', JSON.stringify(bookings));
```

**New Implementation:**
```javascript
// REAL: POST to backend API
const response = await axios.post(`${API}/bookings`, formData);
```

**Changes Required:**
- Remove localStorage logic
- Add axios POST request to `/api/bookings`
- Handle API response (success/error)
- Show toast notifications based on response

---

### 2. Admin Dashboard (`/app/frontend/src/pages/AdminDashboard.jsx`)

**Current Implementation:**
```javascript
// MOCK: Reads from localStorage and mockBookings
const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
const allBookings = [...mockBookings, ...storedBookings];
```

**New Implementation:**
```javascript
// REAL: GET from backend API
const response = await axios.get(`${API}/bookings`);
const bookings = response.data.bookings;
```

**Changes Required:**
- Remove localStorage and mockBookings usage
- Add useEffect to fetch bookings on component mount
- Implement API calls for:
  - Fetching bookings: `GET /api/bookings`
  - Updating status: `PATCH /api/bookings/:id`
  - Deleting booking: `DELETE /api/bookings/:id`
- Add loading states
- Handle API errors gracefully

---

## Backend Implementation Steps

### 1. Create Pydantic Models
File: `/app/backend/models.py` (or inline in server.py)

```python
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    services: List[str]
    message: Optional[str] = ""

class BookingUpdate(BaseModel):
    status: str  # 'pending', 'approved', 'completed', 'declined'

class Booking(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: str
    phone: str
    services: List[str]
    message: str
    status: str = "pending"
    date: Optional[datetime] = None
    createdAt: datetime
    updatedAt: datetime
```

### 2. Create API Endpoints
File: `/app/backend/server.py`

- Implement CRUD operations for bookings
- Add validation for services array (must have at least 1 service)
- Add status enum validation
- Handle MongoDB ObjectId conversion
- Add proper error handling

### 3. MongoDB Collection
- Collection name: `bookings`
- Indexes: 
  - `createdAt` (descending) for sorting
  - `status` for filtering

---

## Testing Checklist

### Frontend Testing:
- [ ] Booking form submits successfully
- [ ] Multiple services can be selected
- [ ] Form validation works (at least 1 service required)
- [ ] Success toast appears after submission
- [ ] Form resets after successful submission

### Admin Dashboard Testing:
- [ ] All bookings load on page mount
- [ ] Bookings display with multiple services as badges
- [ ] Approve/Decline buttons work for pending bookings
- [ ] Mark Completed works for approved bookings
- [ ] Delete button removes bookings
- [ ] Status filters work (All, Pending, Approved, Completed)
- [ ] Stats update correctly

### Backend Testing:
- [ ] POST /api/bookings creates new booking
- [ ] GET /api/bookings returns all bookings
- [ ] GET /api/bookings?status=pending filters correctly
- [ ] PATCH /api/bookings/:id updates status
- [ ] DELETE /api/bookings/:id removes booking
- [ ] Validation errors return proper messages
- [ ] MongoDB connection is stable

---

## Notes

1. **Static Data**: Keep companyInfo, services, testimonials, and galleryItems in mock.js as they don't need database storage yet

2. **Future Enhancements** (not in this phase):
   - Admin authentication
   - Email notifications on booking submission
   - Calendar integration for scheduling
   - Image upload for gallery items

3. **Error Handling**: Both frontend and backend should handle errors gracefully with user-friendly messages

4. **Data Validation**: Backend must validate:
   - Email format
   - Services array not empty
   - Status is valid enum value
