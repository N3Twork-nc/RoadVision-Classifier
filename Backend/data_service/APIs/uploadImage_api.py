from main import app
from fastapi import File, UploadFile,Form
from schemas import ImageSchema
from kafka import KafkaProducer

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
    producer = KafkaProducer(bootstrap_servers=['192.168.120.26:9092'])
    producer.send('image', value=img.dict())          
    return {"status": "success"}