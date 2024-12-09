from main import app
from JWT import Authentication 
from fastapi import Depends, UploadFile
from schemas.user_schemas import User
from services.editProfile_service import ProfileService

@app.post('/api/editProfile')
def edit_profile(data: User, username: str = Depends(Authentication().validate_token)):
    return ProfileService.edit_profile(data, username)

@app.get('/api/getProfile')
def get_profile(username: str = Depends(Authentication().validate_token)):
    return ProfileService.get_profile(username)

@app.post("/api/uploadAvatar")
async def upload_avatar(avata: UploadFile, username: str = Depends(Authentication().validate_token)):
    return await ProfileService.upload_avatar(avata, username)