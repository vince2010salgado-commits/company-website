"""
Backend API tests for Fresh Start Property Care - Booking endpoints
Covers: POST/GET/PATCH/DELETE /api/bookings
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://freshstart-book.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def created_ids():
    """Track ids to clean up after the run."""
    ids = []
    yield ids
    # Cleanup
    s = requests.Session()
    for bid in ids:
        try:
            s.delete(f"{API}/bookings/{bid}", timeout=10)
        except Exception:
            pass


# ---------- POST /api/bookings ----------

class TestCreateBooking:
    def test_create_booking_with_multiple_services(self, session, created_ids):
        payload = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "phone": "555-123-4567",
            "services": ["Gutter Cleaning", "Landscaping", "Power Washing"],
            "message": "Please come on weekend",
        }
        r = session.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 201, f"Expected 201, got {r.status_code}: {r.text}"
        data = r.json()
        assert data["success"] is True
        b = data["booking"]
        assert b["name"] == payload["name"]
        assert b["email"] == payload["email"]
        assert b["phone"] == payload["phone"]
        assert b["services"] == payload["services"]
        assert len(b["services"]) == 3
        assert b["message"] == payload["message"]
        assert b["status"] == "pending"
        assert isinstance(b["id"], str) and len(b["id"]) == 24
        assert b["createdAt"] is not None
        assert b["updatedAt"] is not None
        created_ids.append(b["id"])

        # GET to verify persistence
        r2 = session.get(f"{API}/bookings", timeout=15)
        assert r2.status_code == 200
        ids = [bk["id"] for bk in r2.json()["bookings"]]
        assert b["id"] in ids

    def test_create_booking_single_service(self, session, created_ids):
        payload = {
            "name": "TEST_Jane Single",
            "email": "test_jane@example.com",
            "phone": "555-999-0000",
            "services": ["Junk Removal"],
        }
        r = session.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        b = r.json()["booking"]
        assert b["services"] == ["Junk Removal"]
        assert b["message"] == ""
        created_ids.append(b["id"])

    def test_create_booking_empty_services_rejected(self, session):
        payload = {
            "name": "TEST_Empty",
            "email": "test_empty@example.com",
            "phone": "555-000-0000",
            "services": [],
        }
        r = session.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 400, f"Expected 400 for empty services, got {r.status_code}: {r.text}"

    def test_create_booking_invalid_email_rejected(self, session):
        payload = {
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "phone": "555-000-0000",
            "services": ["Gutter Cleaning"],
        }
        r = session.post(f"{API}/bookings", json=payload, timeout=15)
        assert r.status_code == 422, f"Expected 422 for invalid email, got {r.status_code}: {r.text}"


# ---------- GET /api/bookings ----------

class TestGetBookings:
    def test_get_all_bookings_sorted_desc(self, session, created_ids):
        # ensure we have at least 2 bookings
        for i in range(2):
            r = session.post(f"{API}/bookings", json={
                "name": f"TEST_Sort {i}",
                "email": f"test_sort{i}@example.com",
                "phone": "555-111-2222",
                "services": ["Gutter Cleaning"],
            }, timeout=15)
            assert r.status_code == 201
            created_ids.append(r.json()["booking"]["id"])

        r = session.get(f"{API}/bookings", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        assert "count" in data
        assert isinstance(data["bookings"], list)
        assert data["count"] == len(data["bookings"])
        # Verify sorting by createdAt desc
        timestamps = [b["createdAt"] for b in data["bookings"] if b.get("createdAt")]
        # All createdAt are isoformat strings; comparison works lexicographically for ISO
        assert timestamps == sorted(timestamps, reverse=True), "Bookings not sorted by createdAt desc"

    def test_get_bookings_filter_pending(self, session, created_ids):
        # create a booking (will be pending)
        r = session.post(f"{API}/bookings", json={
            "name": "TEST_FilterPending",
            "email": "test_filter_pending@example.com",
            "phone": "555-333-4444",
            "services": ["Landscaping"],
        }, timeout=15)
        assert r.status_code == 201
        bid = r.json()["booking"]["id"]
        created_ids.append(bid)

        r = session.get(f"{API}/bookings?status=pending", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert all(b["status"] == "pending" for b in data["bookings"])
        assert bid in [b["id"] for b in data["bookings"]]

    def test_get_bookings_filter_approved(self, session, created_ids):
        # create and approve a booking
        r = session.post(f"{API}/bookings", json={
            "name": "TEST_FilterApproved",
            "email": "test_filter_approved@example.com",
            "phone": "555-555-6666",
            "services": ["Power Washing"],
        }, timeout=15)
        bid = r.json()["booking"]["id"]
        created_ids.append(bid)

        upd = session.patch(f"{API}/bookings/{bid}", json={"status": "approved"}, timeout=15)
        assert upd.status_code == 200

        r = session.get(f"{API}/bookings?status=approved", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert all(b["status"] == "approved" for b in data["bookings"])
        assert bid in [b["id"] for b in data["bookings"]]


# ---------- PATCH /api/bookings/{id} ----------

class TestUpdateBooking:
    @pytest.fixture
    def fresh_booking_id(self, session, created_ids):
        r = session.post(f"{API}/bookings", json={
            "name": "TEST_Patch",
            "email": "test_patch@example.com",
            "phone": "555-777-8888",
            "services": ["Gutter Cleaning"],
        }, timeout=15)
        assert r.status_code == 201
        bid = r.json()["booking"]["id"]
        created_ids.append(bid)
        return bid

    def test_update_to_approved(self, session, fresh_booking_id):
        r = session.patch(f"{API}/bookings/{fresh_booking_id}", json={"status": "approved"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["booking"]["status"] == "approved"
        # Verify persistence
        g = session.get(f"{API}/bookings", timeout=15)
        match = [b for b in g.json()["bookings"] if b["id"] == fresh_booking_id]
        assert match and match[0]["status"] == "approved"

    def test_update_to_completed(self, session, fresh_booking_id):
        r = session.patch(f"{API}/bookings/{fresh_booking_id}", json={"status": "completed"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["booking"]["status"] == "completed"

    def test_update_to_declined(self, session, fresh_booking_id):
        r = session.patch(f"{API}/bookings/{fresh_booking_id}", json={"status": "declined"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["booking"]["status"] == "declined"

    def test_update_invalid_status(self, session, fresh_booking_id):
        r = session.patch(f"{API}/bookings/{fresh_booking_id}", json={"status": "garbage"}, timeout=15)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"

    def test_update_invalid_id(self, session):
        r = session.patch(f"{API}/bookings/not-a-valid-id", json={"status": "approved"}, timeout=15)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"

    def test_update_nonexistent_booking(self, session):
        # Valid ObjectId format but doesn't exist
        r = session.patch(f"{API}/bookings/507f1f77bcf86cd799439011", json={"status": "approved"}, timeout=15)
        assert r.status_code == 404, f"Expected 404, got {r.status_code}: {r.text}"


# ---------- DELETE /api/bookings/{id} ----------

class TestDeleteBooking:
    def test_delete_booking(self, session, created_ids):
        r = session.post(f"{API}/bookings", json={
            "name": "TEST_Delete",
            "email": "test_delete@example.com",
            "phone": "555-222-3333",
            "services": ["Junk Removal"],
        }, timeout=15)
        bid = r.json()["booking"]["id"]

        d = session.delete(f"{API}/bookings/{bid}", timeout=15)
        assert d.status_code == 200, d.text
        assert d.json()["success"] is True

        # Verify removal by trying to delete again -> 404
        d2 = session.delete(f"{API}/bookings/{bid}", timeout=15)
        assert d2.status_code == 404

    def test_delete_nonexistent_booking(self, session):
        r = session.delete(f"{API}/bookings/507f1f77bcf86cd799439099", timeout=15)
        assert r.status_code == 404, f"Expected 404, got {r.status_code}: {r.text}"

    def test_delete_invalid_id(self, session):
        r = session.delete(f"{API}/bookings/not-valid", timeout=15)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"
