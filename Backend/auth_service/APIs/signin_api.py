from main import app
from schemas.account_schemas import Account
from services.signin_service import signin_service

@app.post('/api/signin')
def signin(request: Account):
    return signin_service(request)
