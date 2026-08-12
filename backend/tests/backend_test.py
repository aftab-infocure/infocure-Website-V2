"""Backend API tests for infocure.in — insights, contact, health."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fall back to reading frontend/.env
    from pathlib import Path
    for line in Path("/app/frontend/.env").read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
            break

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200


# ---- Insights list/filter ----
class TestInsightsList:
    def test_articles_only(self, client):
        r = client.get(f"{API}/insights", params={"type": "article"})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 3, f"expected 3 articles, got {len(data)}"
        for d in data:
            assert d["type"] == "article"
        slugs = {d["slug"] for d in data}
        assert "cfo-guide-s4hana-migration" in slugs

    def test_blog_only(self, client):
        r = client.get(f"{API}/insights", params={"type": "blog"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 3, f"expected 3 blog posts, got {len(data)}"
        for d in data:
            assert d["type"] == "blog"
        slugs = {d["slug"] for d in data}
        assert "why-fit-to-standard-beats-customization" in slugs

    def test_all_insights(self, client):
        r = client.get(f"{API}/insights")
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 6, f"expected 6 total insights, got {len(data)}"


# ---- Insights single ----
class TestInsightSingle:
    def test_get_article_slug(self, client):
        r = client.get(f"{API}/insights/cfo-guide-s4hana-migration")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "cfo-guide-s4hana-migration"
        assert d["type"] == "article"
        assert len(d["sections"]) > 0

    def test_get_blog_slug(self, client):
        r = client.get(f"{API}/insights/why-fit-to-standard-beats-customization")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "why-fit-to-standard-beats-customization"
        assert d["type"] == "blog"

    def test_unknown_slug_404(self, client):
        r = client.get(f"{API}/insights/does-not-exist-xyz")
        assert r.status_code == 404


# ---- Contact ----
class TestContact:
    def test_contact_valid(self, client):
        payload = {
            "name": "TEST_Playwright User",
            "email": "test_playwright@example.com",
            "message": "This is a backend test enquiry.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == payload["name"]
        assert d["email"] == payload["email"]
        assert d["message"] == payload["message"]
        assert "id" in d and len(d["id"]) > 0

    def test_contact_invalid_email(self, client):
        r = client.post(
            f"{API}/contact",
            json={"name": "X", "email": "not-an-email", "message": "hi"},
        )
        assert r.status_code == 422
