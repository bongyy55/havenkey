import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

import random

SMTP_SERVER = os.getenv("BREVO_SMTP_SERVER")
SMTP_PORT = int(os.getenv("BREVO_SMTP_PORT"))
SMTP_LOGIN = os.getenv("BREVO_SMTP_LOGIN")
SMTP_KEY = os.getenv("BREVO_SMTP_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_NAME = os.getenv("SENDER_NAME")


def generate_otp() -> str:
    """Generate a random 6-digit OTP code as a string, e.g. '048213'."""
    return str(random.randint(0, 999999)).zfill(6)


def send_email(to_email: str, subject: str, html_content: str):
    """Sends an HTML email using Brevo's SMTP relay"""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
    msg["To"] = to_email

    msg.attach(MIMEText(html_content, "html"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_LOGIN, SMTP_KEY)
        server.sendmail(SENDER_EMAIL, to_email, msg.as_string())


def send_otp_email(to_email: str, name: str, otp_code: str):
    """Sends the B'Narch-branded OTP verification email"""
    subject = "Verify your B'Narch account"
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background-color: #ffffff;">
        <h1 style="color: #111111; font-size: 22px; margin-bottom: 8px;">
            B'<span style="color: #C9975C;">Narch</span>
        </h1>
        <p style="color: #333333; font-size: 15px;">Hi {name},</p>
        <p style="color: #333333; font-size: 15px;">
            Use the code below to verify your email address. This code expires in 10 minutes.
        </p>
        <div style="background-color: #F5F1E8; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111111;">
                {otp_code}
            </span>
        </div>
        <p style="color: #888888; font-size: 13px;">
            If you didn't request this, you can safely ignore this email.
        </p>
    </div>
    """
    send_email(to_email, subject, html_content)

def send_password_reset_email(to_email: str, name: str, reset_link: str):
    """Sends the B'Narch-branded password reset email"""
    subject = "Reset your B'Narch password"
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background-color: #ffffff;">
        <h1 style="color: #111111; font-size: 22px; margin-bottom: 8px;">
            B'<span style="color: #C9975C;">Narch</span>
        </h1>
        <p style="color: #333333; font-size: 15px;">Hi {name},</p>
        <p style="color: #333333; font-size: 15px;">
            We received a request to reset your password. Click the button below to choose a new one. This link expires in 10 minutes.
        </p>
        <div style="text-align: center; margin: 28px 0;">
            <a href="{reset_link}" style="background-color: #111111; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-size: 14px; font-weight: bold; display: inline-block;">
                Reset Password
            </a>
        </div>
        <p style="color: #888888; font-size: 13px;">
            If you didn't request this, you can safely ignore this email — your password will remain unchanged.
        </p>
    </div>
    """
    send_email(to_email, subject, html_content)