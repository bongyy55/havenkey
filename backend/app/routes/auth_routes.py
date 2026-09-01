from datetime import datetime, timedelta
import secrets

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..models import user as models
from ..schemas import user as schemas
from ..services.auth import hash_password, verify_password, create_access_token
from ..services.email_utils import generate_otp, send_otp_email, send_password_reset_email
from ..database import get_db
router = APIRouter()

OTP_EXPIRY_MINUTES = 10


@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    initial_status = "pending" if user.role == "agent" else "active"

    otp_code = generate_otp()
    otp_expires_at = datetime.utcnow() + timedelta(minutes=OTP_EXPIRY_MINUTES)

    new_user = models.User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        password=hashed_pw,
        role=user.role,
        status=initial_status,
        business_name=user.business_name,
        years_experience=user.years_experience,
        is_verified="false",
        otp_code=otp_code,
        otp_expires_at=otp_expires_at,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    send_otp_email(new_user.email, new_user.name, otp_code)

    return new_user


@router.post("/verify-otp")
def verify_otp(payload: schemas.VerifyOtpRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.is_verified == "true":
        return {"message": "Account already verified"}

    if not user.otp_code or not user.otp_expires_at:
        raise HTTPException(status_code=400, detail="No OTP was requested for this account")

    if datetime.utcnow() > user.otp_expires_at:
        raise HTTPException(status_code=400, detail="OTP has expired. Please request a new one")

    if payload.otp_code != user.otp_code:
        raise HTTPException(status_code=400, detail="Incorrect OTP code")

    user.is_verified = "true"
    user.otp_code = None
    user.otp_expires_at = None

    db.commit()

    return {"message": "Account verified successfully"}

@router.post("/forgot-password")
def forgot_password(payload: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    # Always return the same response whether or not the email exists,
    # so we don't leak which emails are registered
    if not user:
        return {"message": "If that email exists, a reset link has been sent."}

    reset_token = secrets.token_urlsafe(32)
    user.otp_code = reset_token
    user.otp_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.commit()

    reset_link = f"http://localhost:3000/reset-password?email={payload.email}&token={reset_token}"
    send_password_reset_email(user.email, user.name, reset_link)

    return {"message": "If that email exists, a reset link has been sent."}


@router.post("/reset-password")
def reset_password(payload: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user or not user.otp_code or not user.otp_expires_at:
        raise HTTPException(status_code=400, detail="Invalid or expired reset link")

    if datetime.utcnow() > user.otp_expires_at:
        raise HTTPException(status_code=400, detail="This reset link has expired")

    if payload.token != user.otp_code:
        raise HTTPException(status_code=400, detail="Invalid or expired reset link")

    user.password = hash_password(payload.new_password)
    user.otp_code = None
    user.otp_expires_at = None
    db.commit()

    return {"message": "Password reset successfully"}

@router.post("/login", response_model=schemas.TokenResponse)
def login_user(credentials: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }