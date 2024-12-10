from main import app
from fastapi import File, UploadFile,Form
from schemas import ImageSchema

@app.post("/api/uploadImage")
async def upload_image(file: UploadFile, latitude: float = Form(...),longitude: float=Form(...)):
    # Xử lý lưu ảnh hoặc thực hiện các hành động khác nếu cần
    # file_info = ImageUploadSchema(
    #     filename=file.filename,
    #     content_type=file.content_type,
    #     latitude=latitude,
    #     longitude=longitude
    # )
    return file_info