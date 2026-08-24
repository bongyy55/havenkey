from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    role: str
    business_name: Optional[str] = None
    years_experience: Optional[int] = None

class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: str
    role: str
    status: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class VerifyOtpRequest(BaseModel):
    email: EmailStr
    otp_code: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    token: str
    new_password: str