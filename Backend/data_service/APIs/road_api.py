from main import app
from services import RoadService,validate_token
from fastapi import File, UploadFile,Form, Depends
from fastapi.responses import JSONResponse
from schemas import RoadSchema
import os
current_file_path = os.path.abspath(__file__)


@app.post("/api/uploadRoad")
async def upload_image(file: UploadFile = File(...), latitude: float = Form(...),longitude: float=Form(...), username = Depends(validate_token)):
    try:
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"status": "error", "message": "Only image files are allowed"}, status_code=400)
        road = RoadSchema(
            username=username,
            file=await file.read(),
            latitude=latitude,
            longitude=longitude
        )
        await RoadService.insertRoad(road)
        return JSONResponse(content={"status": "success", "message": "Image uploaded successfully"}, status_code=200)
    except Exception as e:
        print(current_file_path, e)
        return JSONResponse(content={"status": "error", "message": "Internal server error"}, status_code=500)


@app.delete("/api/deleteRoad")
def delete_imageRoad(id_road: int, username = Depends(validate_token)):
    try:
        return RoadService.deleteRoad(id_road, username)
    except Exception as e:
        print(current_file_path, e)
        return JSONResponse(content={"status": "error", "message": "Internal server error"}, status_code=500)

@app.get("/api/getInfoRoads")
def get_roads(user_id: int=None, id_road: int=None):
    try: 
        return RoadService.getlistRoad(user_id, id_road)
    except Exception as e:
        print(current_file_path, e)
        return JSONResponse(content={"status": "error", "message": "Internal server error"}, status_code=500)
    
