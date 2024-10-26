from main import app
from schemas import Account, ChangePassword
from services import PasswordService

@app.post('/api/forgotPassword')
def forgotPassword(request: Account):
    return PasswordService.forgot_password(request)

@app.post('/api/changePassword')
def changePassword(request: ChangePassword):
    return PasswordService.change_password(request)
