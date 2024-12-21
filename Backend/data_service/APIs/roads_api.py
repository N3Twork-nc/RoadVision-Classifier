from main import app
from services import RoadService

@app.get("/api/getRoadAll")
def get_roads(user_id: int=None, id_road: int=None):
    return RoadService.getlistRoad(user_id, id_road)
    
