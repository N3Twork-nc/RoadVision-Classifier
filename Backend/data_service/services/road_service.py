from schemas import RoadSchema
from kafka import KafkaProducer
import json
import base64
from fastapi import Depends
from fastapi.responses import JSONResponse
from Database import Postgresql
import os

current_file_path = os.path.abspath(__file__)

class RoadService:
    @staticmethod
    async def insertRoad(roadSchema: RoadSchema):
        try: 
            id=roadSchema.insertRoad()[0]
            img=roadSchema.file
            producer=KafkaProducer(
                bootstrap_servers='192.168.120.26:9092',
                value_serializer=lambda v: json.dumps(v).encode('utf-8')
            )
            message={
                "id":id,
                "file": base64.b64encode(img).decode('utf-8'),
            }
            producer.send('image', message)
            producer.flush()
            return True
        except Exception as e:
            print(current_file_path, e)
            return False


    @staticmethod
    def getlistRoad(user_id=None,id_road=None):
        db=Postgresql()
        roads=db.execute(f"SELECT * FROM road where ({not id_road} or id={id_road if id_road else -1}) and ({not user_id} or user_id='{user_id if user_id else -1}')",fetch='all')
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
        data=[road.reformat().json() for road in road_schemas]
        reponse=JSONResponse(content={
            "status": "success",
            "data": data,
            "message": "Get info road successfully"
            },status_code=200)
        return reponse

    @staticmethod
    def deleteRoad(id_road, username):
        try: 
            db=Postgresql()
            fetch_road=db.execute(f"SELECT id,image_path FROM road WHERE id={id_road}",fetch='one')
            if (not fetch_road): 
                return JSONResponse(content={"status": "error", "message": "Road not found"}, status_code=404)
            permission=db.execute(f"SELECT 1 FROM road join account on road.user_id=account.id join role on role.user_id=account.id WHERE (road.id={id_road} and account.username='{username}') or role.permission_id=1",fetch='one')
            if (not permission):
                return JSONResponse(content={"status": "error", "message": "You don't have permission to delete this road"}, status_code=403)
            road=RoadSchema(id=fetch_road[0],filepath=fetch_road[1])
            road.deleteRoad()
            db.close()
            return JSONResponse(content={"status": "success", "message": "Road was deleted successfully"}, status_code=200)
        except Exception as e:
            print(current_file_path, e)
            return JSONResponse(content={"status": "error", "message": "Internal server error"}, status_code=500)
