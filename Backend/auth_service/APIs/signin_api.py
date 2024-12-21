from main import app
from schemas.account_schemas import Account,Role
from services.signin_service import signin_service,authorization_service
from fastapi import Depends
from JWT import Authentication

@app.post('/api/signin')
async def signin(request: Account,role: Role = None):
    return signin_service(request,role)

@app.get('/api/authorization')
async def authorization(role: Role=None, username=Depends(Authentication().validate_token)):
    return authorization_service(username,role)