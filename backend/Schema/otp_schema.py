from pydantic import BaseModel, EmailStr

class VerifyOtpRequest(BaseModel):
    phone: str
    otp: str