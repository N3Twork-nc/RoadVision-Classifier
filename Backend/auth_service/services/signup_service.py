from schemas import Account, Mail
from .format_response import format_response
import random


class SignupService:
    @staticmethod
    def signup_account(account: Account):
        if account.existenceUsername():
            return format_response("Error", message="Username already exists", status_code=400)
        if account.existenceEmail():
            return format_response("Error", message="Email already exists", status_code=400)
        OTP = random.randint(10000, 99999)
        mail = Mail()
        mail.sendOTP(account.email, OTP)
        if account.insertAccount(OTP):
            return format_response("Success", message="Enter OTP sent to your email to verify your account")
        return format_response("Error", message="Account creation failed", status_code=400)

    @staticmethod
    def verify_email(account: Account):
        if account.verifyEmail():
            return format_response("Success", message="Email verified successfully")
        return format_response("Error", message="Email verification failed", status_code=400)