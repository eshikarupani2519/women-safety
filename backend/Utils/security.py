import secrets
import hashlib

def generate_device_token():
    return secrets.token_urlsafe(64)

def hash_token(token: str):
    return hashlib.sha256(token.encode()).hexdigest()