from main import app
from fastapi import File, UploadFile,Form
from schemas import ImageSchema

@app.post("/api/uploadImage")
async def upload_image(file: UploadFile = File(...), latitude: float = Form(...),longitude: float=Form(...)):
    #Xử lý lưu ảnh hoặc thực hiện các hành động khác nếu cần
    img = ImageSchema(
        user_id=1,
        file=file,
        latitude=latitude,
        longitude=longitude
    )
    img.insertImage()
    return {"status": "success"}