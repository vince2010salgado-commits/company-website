# Fresh Start Property Care - Product Requirements Document

## Original Problem Statement
Make an appointment booking website for Fresh Start Property Care (Instagram: @freshstartpropertycare)

## Business Details
- **Company**: Fresh Start Property Care
- **Owners**: Owen & Noah
- **Location**: Katy, TX
- **Contact**: 832-291-9876, 331-452-9543
- **Email**: owenrob8418@gmail.com
- **Instagram**: @freshstartpropertycare
- **Services**: Gutter Cleaning, Landscaping, Junk Removal, Power Washing
- **Tagline**: "RELIABLE. AFFORDABLE. LOCAL."

## User Personas

### 1. Customer (Homeowner in Katy, TX)
- Wants property care services
- Needs to request free estimate
- May need multiple services
- Wants quick contact options

### 2. Admin (Owen & Noah)
- Need to view all booking requests
- Approve/decline incoming bookings
- Mark completed jobs
- Track booking status

## Core Requirements (Static)
- Frontend: React with Tailwind CSS
- Backend: FastAPI with MongoDB
- Brand Colors: Forest Green (#3d6e3a) + Black + White
- Service Area: Katy, TX

## What's Been Implemented (as of 2026-05-29)

### Frontend Pages
- ✅ Home - Hero, services overview, why choose us, testimonials preview, CTAs
- ✅ Services - Detailed view of all 4 services with features
- ✅ Gallery - Before/After showcase grid (placeholder images, real photos pending from client)
- ✅ Testimonials - Customer reviews with 5-star ratings + stats (50+ customers, 5.0 rating, 50+ jobs)
- ✅ About - Company story, values, Owen & Noah info, Katy HS Football support
- ✅ Contact - Call/Email/Service area cards (business hours removed per client request)
- ✅ Booking - Free estimate request form with **MULTIPLE service selection** via checkboxes
- ✅ Admin Dashboard (/admin) - Full CRUD on bookings

### Backend API Endpoints (all prefixed with /api)
- ✅ POST /api/bookings - Create new booking (with validation)
- ✅ GET /api/bookings - List all bookings (with optional status filter)
- ✅ PATCH /api/bookings/:id - Update booking status
- ✅ DELETE /api/bookings/:id - Delete booking

### Database (MongoDB)
- ✅ `bookings` collection with schema: name, email, phone, services[], message, status, date, createdAt, updatedAt

### Tested & Working
- ✅ All 16 backend API tests passed (100%)
- ✅ End-to-end booking flow verified via UI
- ✅ Multiple services display correctly as badges
- ✅ Admin actions (approve/decline/complete/delete) working

## Prioritized Backlog (Remaining)

### P1 - Visual Enhancements (Pending Client Assets)
- [ ] Add real before/after photos to Gallery (client to provide)
- [ ] Add company logo image (current uses text-based logo)

### P2 - Operational Features (Future)
- [ ] Email notifications on new booking submission (SendGrid/Resend)
- [ ] SMS confirmation for customers (Twilio)
- [ ] Admin authentication (currently /admin is publicly accessible)
- [ ] Calendar integration for scheduling approved bookings
- [ ] Customer follow-up system

### P3 - Business Growth Features
- [ ] Customer reviews/testimonials submission form
- [ ] Service pricing calculator
- [ ] Photo upload for customers to show their property
- [ ] Referral discount program
- [ ] SEO optimization for Katy, TX searches

## Architecture Decisions
- Static data (services, testimonials, gallery, company info) kept in `mock.js` - no DB needed
- Only bookings persisted to MongoDB (the only dynamic data right now)
- MongoDB ObjectId used as booking IDs
- No authentication on admin routes yet (MVP)

## Next Action Items
1. Client to provide real before/after photos for Gallery
2. Add admin authentication before production deployment
3. Optional: Add email notifications when bookings are submitted
