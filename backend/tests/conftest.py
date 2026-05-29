"""Shared fixtures for backend tests - JWT auth setup for admin endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://freshstart-book.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "owenrob8418@gmail.com"
ADMIN_PASSWORD = "FreshStart2026!"


@pytest.fixture(scope="session")
def admin_token():
    """Login once and return JWT token for admin endpoints."""
    r = requests.post(
        f"{API}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=15,
    )
    if r.status_code != 200:
        pytest.skip(f"Admin login failed ({r.status_code}): {r.text}")
    data = r.json()
    token = data.get("token")
    assert token, "No token in login response"
    return token


@pytest.fixture(scope="session")
def session(admin_token):
    """Authenticated session - used by booking admin endpoints."""
    s = requests.Session()
    s.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}",
    })
    return s


@pytest.fixture(scope="session")
def public_session():
    """Unauthenticated session - for public POST /api/bookings and 401 tests."""
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s
