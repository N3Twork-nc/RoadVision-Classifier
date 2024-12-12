from main import app
from fastapi import Depends, UploadFile
from schemas.user_schemas import User
from services.editProfile_service import ProfileService
from services.auth_validate import validate_token

@app.post('/api/editProfile')
def edit_profile(data: User, username: str = Depends(validate_token)):
    return ProfileService.edit_profile(data, username)

@app.get('/api/getProfile')
def get_profile(username: str = Depends(validate_token)):
    return ProfileService.get_profile(username)