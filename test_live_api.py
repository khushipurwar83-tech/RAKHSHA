import requests
import json

BASE_URL = "https://rakhsha-backend.onrender.com"

def test_health():
    print(f"Testing Health Check at {BASE_URL}/health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_registration():
    print(f"\nTesting Registration at {BASE_URL}/api/auth/register...")
    payload = {
        "email": "test_agent@rakhsha.com",
        "password": "Password123!",
        "full_name": "Test Agent",
        "phone_number": "9999999999",
        "emergency_pin": "1234"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_health()
    test_registration()
