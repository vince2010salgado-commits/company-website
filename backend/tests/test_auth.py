"""
JWT auth tests for Fresh Start Property Care admin endpoints.
Covers: POST /api/auth/login, GET /api/auth/me, auth protection on /api/bookings.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://freshstart-book.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "owenrob8418@gmail.com"
ADMIN_PASSWORD = "FreshStart2026!"


# ---------- POST /api/auth/login ----------
class TestLogin:
    def test_login_success_returns_token(self, public_session):
        r = public_session.post(
            f"{API}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=15,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["token"], str) and len(data["token"]) > 20
        # JWT has 3 dot-separated parts
        assert data["token"].count(".") == 2
        assert data["admin"]["email"] == ADMIN_EMAIL

    def test_login_wrong_password_401(self, public_session):
        r = public_session.post(
            f"{API}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword!"},
            timeout=15,
        )
        assert r.status_code == 401
        assert "detail" in r.json()

    def test_login_nonexistent_email_401(self, public_session):
        r = public_session.post(
            f"{API}/auth/login",
            json={"email": "nobody@example.com", "password": "WhateverPass1!"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_login_invalid_email_format_422(self, public_session):
        r = public_session.post(
            f"{API}/auth/login",
            json={"email": "not-email", "password": "x"},
            timeout=15,
        )
        assert r.status_code == 422

    def test_login_email_case_insensitive(self, public_session):
        r = public_session.post(
            f"{API}/auth/login",
            json={"email": ADMIN_EMAIL.upper(), "password": ADMIN_PASSWORD},
            timeout=15,
        )
        assert r.status_code == 200, r.text


# ---------- GET /api/auth/me ----------
class TestAuthMe:
    def test_me_with_valid_token(self, admin_token):
        r = requests.get(
            f"{API}/auth/me",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=15,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert data["admin"]["email"] == ADMIN_EMAIL

    def test_me_without_token_401(self, public_session):
        r = public_session.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_malformed_token_401(self, public_session):
        r = public_session.get(
            f"{API}/auth/me",
            headers={"Authorization": "Bearer not.a.jwt"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_me_with_wrong_scheme_401(self, public_session):
        r = public_session.get(
            f"{API}/auth/me",
            headers={"Authorization": f"Basic abc123"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_me_with_invalid_signature_401(self, public_session):
        # Valid format but wrong signature
        fake_jwt = (
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
            "eyJzdWIiOiJvd2Vucm9iODQxOEBnbWFpbC5jb20iLCJleHAiOjk5OTk5OTk5OTksInR5cGUiOiJhY2Nlc3MifQ."
            "INVALID_SIGNATURE_xxxxxxxxxxxxxxxxxxxxxxxxx"
        )
        r = public_session.get(
            f"{API}/auth/me",
            headers={"Authorization": f"Bearer {fake_jwt}"},
            timeout=15,
        )
        assert r.status_code == 401


# ---------- Booking endpoints auth protection ----------
class TestBookingsAuthProtection:
    def test_get_bookings_without_token_401(self, public_session):
        r = public_session.get(f"{API}/bookings", timeout=15)
        assert r.status_code == 401

    def test_get_bookings_with_token_200(self, session):
        r = session.get(f"{API}/bookings", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["bookings"], list)
        assert "count" in data

    def test_patch_booking_without_token_401(self, public_session, session):
        # Need a real id; create one via public POST first
        c = public_session.post(f"{API}/bookings", json={
            "name": "TEST_AuthPatch",
            "email": "test_auth_patch@example.com",
            "phone": "555-000-1111",
            "services": ["Gutter Cleaning"],
        }, timeout=15)
        assert c.status_code == 201
        bid = c.json()["booking"]["id"]

        r = public_session.patch(f"{API}/bookings/{bid}", json={"status": "approved"}, timeout=15)
        assert r.status_code == 401

        # cleanup
        session.delete(f"{API}/bookings/{bid}", timeout=15)

    def test_patch_booking_with_token_200(self, session, public_session):
        c = public_session.post(f"{API}/bookings", json={
            "name": "TEST_AuthPatch2",
            "email": "test_auth_patch2@example.com",
            "phone": "555-000-2222",
            "services": ["Landscaping"],
        }, timeout=15)
        bid = c.json()["booking"]["id"]

        r = session.patch(f"{API}/bookings/{bid}", json={"status": "approved"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["booking"]["status"] == "approved"

        session.delete(f"{API}/bookings/{bid}", timeout=15)

    def test_delete_booking_without_token_401(self, public_session, session):
        c = public_session.post(f"{API}/bookings", json={
            "name": "TEST_AuthDel",
            "email": "test_auth_del@example.com",
            "phone": "555-000-3333",
            "services": ["Power Washing"],
        }, timeout=15)
        bid = c.json()["booking"]["id"]

        r = public_session.delete(f"{API}/bookings/{bid}", timeout=15)
        assert r.status_code == 401

        # cleanup with auth
        session.delete(f"{API}/bookings/{bid}", timeout=15)

    def test_delete_booking_with_token_200(self, session, public_session):
        c = public_session.post(f"{API}/bookings", json={
            "name": "TEST_AuthDel2",
            "email": "test_auth_del2@example.com",
            "phone": "555-000-4444",
            "services": ["Junk Removal"],
        }, timeout=15)
        bid = c.json()["booking"]["id"]

        r = session.delete(f"{API}/bookings/{bid}", timeout=15)
        assert r.status_code == 200
        assert r.json()["success"] is True

    def test_post_bookings_remains_public_201(self, public_session, session):
        """Customer submissions must NOT require auth."""
        r = public_session.post(f"{API}/bookings", json={
            "name": "TEST_PublicCustomer",
            "email": "test_public_customer@example.com",
            "phone": "555-000-5555",
            "services": ["Gutter Cleaning"],
            "message": "No auth needed",
        }, timeout=15)
        assert r.status_code == 201, r.text
        bid = r.json()["booking"]["id"]
        # cleanup
        session.delete(f"{API}/bookings/{bid}", timeout=15)


# ---------- Idempotent admin seeding ----------
class TestAdminSeeding:
    def test_admin_seed_idempotent_login_works(self, public_session):
        """Login should always work; if seed duplicated, login could fail or behave strangely."""
        for _ in range(3):
            r = public_session.post(
                f"{API}/auth/login",
                json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
                timeout=15,
            )
            assert r.status_code == 200
            assert r.json()["admin"]["email"] == ADMIN_EMAIL
