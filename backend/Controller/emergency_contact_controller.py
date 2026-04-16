from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from Schema.emergency_contact import ContactCreate
from Service import emergency_contact_service

router = APIRouter(prefix="/contacts", tags=["Emergency Contacts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add")
def add_contact(data: ContactCreate, db: Session = Depends(get_db)):
    return emergency_contact_service.create_contact(db, data)

@router.get("/all")
def get_all_contacts(db: Session = Depends(get_db)):
    return emergency_contact_service.all_contacts(db)

@router.post("/alert/{id}")
def send_alert(id: int, db: Session = Depends(get_db)):
    result = emergency_contact_service.send_alert(db, id)

    if not result:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {
        "success": True,
        "sent_to": result["phone"]
    }