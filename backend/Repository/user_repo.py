from sqlalchemy.orm import Session
from Model.user_model import User

def create_user(db: Session, name: str, email: str, phone: str, token_hash: str):
    user = User(
        name=name,
        email=email,
        phone=phone,
        device_token_hash=token_hash
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_token(db: Session, token_hash: str):
    return db.query(User).filter(User.device_token_hash == token_hash).first()