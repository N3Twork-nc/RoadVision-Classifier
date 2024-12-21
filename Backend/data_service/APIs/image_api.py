from main import app
from fastapi import File, UploadFile,Form
from schemas import ImageSchema
from services import RoadService
from fastapi import Depends
from fastapi.responses import FileResponse
from services.auth_validate import validate_token


@app.post("/api/uploadImage")
async def upload_image(file: UploadFile = File(...), latitude: float = Form(...),longitude: float=Form(...), username = Depends(validate_token)):
    #Xử lý lưu ảnh hoặc thực hiện các hành động khác nếu cần
    img = ImageSchema(
        user_id=9,
        file=await file.read(),
        latitude=latitude,
        longitude=longitude
    )
    await RoadService.uploadImageS(img)
    response={
        "status": "success",
        "message": "Image uploaded successfully"
    }
    return response


@app.get("/api/getImage")
async def get_image(imagePath: str):
    return FileResponse(imagePath)
