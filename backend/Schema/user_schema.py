from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    phone: str
    name: str
    email: EmailStr