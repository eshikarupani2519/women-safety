# from pydantic import EmailStr

# from Repository import user_repo
# from Utils.security import generate_device_token, hash_token

# def register_user(db, name:str,email:EmailStr,phone: str):
#     device_token = generate_device_token()
#     token_hash = hash_token(device_token)

#     user = user_repo.create_user(db, name, email, phone, token_hash)

#     return {
#         "user": user,
#         "device_token": device_token
#     }

# def authenticate_user(db, device_token: str):
#     token_hash = hash_token(device_token)
#     return user_repo.get_user_by_token(db, token_hash)


from Repository import user_repo
from Utils.security import generate_device_token, hash_token
from twilio.rest import Client

from dotenv import load_dotenv

load_dotenv()

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
VERIFY_SID = os.getenv("TWILIO_VERIFY_SID")


client = Client(ACCOUNT_SID, AUTH_TOKEN)


def send_otp(phone: str):
    verification = client.verify.v2.services(VERIFY_SID)\
        .verifications.create(to=phone, channel="sms")

    return {"message": "OTP Sent"}


def verify_otp(phone: str, otp: str):
    result = client.verify.v2.services(VERIFY_SID)\
        .verification_checks.create(to=phone, code=otp)

    return result.status == "approved"


def register_user(db, name, email, phone):
    device_token = generate_device_token()
    token_hash = hash_token(device_token)

    user = user_repo.create_user(db, name, email, phone, token_hash)

    return {
        "user": user,
        "device_token": device_token
    }

def authenticate_user(db, device_token: str):
    token_hash = hash_token(device_token)
    return user_repo.get_user_by_token(db, token_hash)