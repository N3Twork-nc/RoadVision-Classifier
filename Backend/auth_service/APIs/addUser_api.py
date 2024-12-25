from main import app
from schemas.account_schemas import AddUser
from services.addUser_service import create_user_service
from fastapi import Depends
from JWT import Authentication

@app.post('/api/addUser')
def create_user(request: AddUser, current_user: str = Depends(Authentication().validate_token)):
    return create_user_service(request, current_user)