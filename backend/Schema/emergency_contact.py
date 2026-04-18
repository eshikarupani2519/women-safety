from pydantic import BaseModel

class ContactCreate(BaseModel):
    name: str
    phone: str
    relationship: str

class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
    relationship: str

    class Config:
        orm_mode = True