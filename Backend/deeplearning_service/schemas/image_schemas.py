from pydantic import BaseModel, Field
from datetime import datetime
from Database import Postgresql

class ImageSchema(BaseModel):
    id:int = Field(..., description="Id of image")
    user_id: int =Field(..., description="User own imgae")
    filepath: str = Field(..., description="Path of the uploaded file")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    type: bool = Field(...,description="Bad or Good")

    def insertImgae():
        db=Postgresql()
        db.insert()
        return 