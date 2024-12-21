from schemas import ImageSchema, RoadSchema
from kafka import KafkaProducer
import json
import base64
from fastapi import Depends
from fastapi.responses import JSONResponse
from Database import Postgresql


class RoadService:
    @staticmethod
    async def uploadImage(imageSchema:ImageSchema):
        id=imageSchema.insertImage()[0]
        img=imageSchema.file
        producer=KafkaProducer(bootstrap_servers='192.168.120.26:9092'
        ,value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        message={
            "id":id,
            "file": base64.b64encode(img).decode('utf-8'),
        }
        producer.send('image', message)
    @staticmethod
    def getlistRoad(user_id=None,id_road=None):
        id_road = id_road if id_road else "all"
        user_id = user_id if user_id else "all"
        db=Postgresql()
        roads=db.execute(f"SELECT * FROM road",fetch='all')
        road_schemas = [
            RoadSchema(
                id=id,
                user_id=user_id,
                latitude=latitude,
                longitude=longitude,
                level=level,
                filepath=filepath,
                created_at=created_at
            )
            for id, user_id, latitude, longitude, level, filepath, created_at in roads
        ]
        db.close()
        data=[road.change_path().json() for road in road_schemas]
        reponse=JSONResponse(content={
            "status": "success",
            "data": data,
            "message": "Get info road successfully"
            },status_code=200)
        return reponse
