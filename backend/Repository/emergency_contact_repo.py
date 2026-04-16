from Model.emergency_contact_model import EmergencyContact

def add_contact(db, data):
    contact = EmergencyContact(
        name=data.name,
        phone=data.phone,
        relationship=data.relationship
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

def get_contacts(db):
    return db.query(EmergencyContact).all()

def get_contact_by_id(db, id):
    return db.query(EmergencyContact).filter(EmergencyContact.id == id).first()