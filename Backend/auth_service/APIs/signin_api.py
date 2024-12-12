from main import app
from schemas.account_schemas import Account
from services.signin_service import signin_service
from fastapi import Depends
from JWT import Authentication

@app.post('/api/signin')
def signin(request: Account):
    return signin_service(request)
@app.get('/api/authorization')
def authorization(username=Depends(Authentication().validate_token)):
    response={
        "status":"Success",
        "message":"Token is valid",
        "data":{
            "username":username
        }

    }
    return response