from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20), unique=True)
    name = Column(String(30))
    email = Column(String(30), unique=True)
    device_token_hash = Column(String(256))