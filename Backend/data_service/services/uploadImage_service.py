from schemas import ImageSchema
from kafka import KafkaProducer
import json
import base64
from fastapi import Depends

async def uploadImageService(imageSchema:ImageSchema):
    id=imageSchema.insertImage()[0]
    img=imageSchema.file
    producer=KafkaProducer(bootstrap_servers='192.168.120.26:9092'
     ,value_serializer=lambda v: json.dumps(v).encode('utf-8'))
    message={
        "id":id,
        "file": base64.b64encode(img).decode('utf-8'),
    }
    producer.send('image', message)

