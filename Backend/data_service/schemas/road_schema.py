from pydantic import BaseModel, Field
from Database import Postgresql

class ImageSchema(BaseModel):
    id: int = Field(None, description="Id of the image")
    user_id: int =Field(..., description="User own imgae")
    file: UploadFile = Field(..., description="File uploaded")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    level: str = Field(None, description="Level of road")
    created_at: datetime = Field(None, description="Created at")

    @staticmethod
    def getInfoRoad(id_road,user_id):
        db = Postgresql()
        if id_road=="all"
            result = db.select("SELECT * FROM road whre user_id = %s", (user_id,))
        else: 
            result = db.select("SELECT * FROM road whre id = %s and user_id = %s", (id_road,user_id))
        return Postgresql().select("SELECT * FROM image")