from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from Service import user_service
from Schema.user_schema import UserCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from Service import user_service
from Schema.user_schema import UserCreate
from Schema.otp_schema import VerifyOtpRequest
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Step 1 Send OTP
@router.post("/send-otp")
def send_otp(phone: str):
    return user_service.send_otp(phone)


# Step 2 Verify OTP + Register
# @router.post("/verify-otp")
# def verify_otp(user: UserCreate, otp: str, db: Session = Depends(get_db)):
    
#     verified = user_service.verify_otp(user.phone, otp)

#     if not verified:
#         raise HTTPException(status_code=400, detail="Invalid OTP")

#     result = user_service.register_user(
#         db,
#         user.name,
#         user.email,
#         user.phone
#     )

#     return {
#         "message": "Registration Successful",
#         "device_token": result["device_token"],
#         "user_id": result["user"].id
#     }
@router.post("/verify-otp")
def verify_otp(data: VerifyOtpRequest):
    verified = user_service.verify_otp(data.phone, data.otp)

    if not verified:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"message": "OTP Verified"}

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    result = user_service.register_user(
        db,
        user.name,
        user.email,
        user.phone
    )

    return {
        "device_token": result["device_token"],
        "user_id": result["user"].id
    }

@router.post("/sos")
def send_sos(
    device_token: str = Header(...),
    db: Session = Depends(get_db)
):
    user = user_service.authenticate_user(db, device_token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid device")

    return {"message": f"SOS sent for {user.phone}"}