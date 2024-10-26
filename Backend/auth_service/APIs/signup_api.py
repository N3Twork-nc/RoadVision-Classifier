from main import app
from schemas import Account
from services import SignupService

@app.post('/api/APIsignup')
def signup(request: Account):
    return SignupService.signup_account(request)

@app.post('/api/APIverifyEmail')
def verifyEmail(request: Account):
    return SignupService.verify_email(request)