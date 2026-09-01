from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # "client" | "agent" | "admin"
    status = Column(String, default="active")  # "active" | "pending" | "suspended"

    is_verified = Column(String, default="false")  # "true" | "false"
    otp_code = Column(String, nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)

    # Agent-specific fields (blank for clients)
    business_name = Column(String, nullable=True)
    years_experience = Column(Integer, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)