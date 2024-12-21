from pydantic import BaseModel, Field
from Database import Postgresql
from datetime import datetime


class RoadSchema(BaseModel):
    id: int = Field(None, description="Id of the image")
    user_id: int =Field(..., description="User own imgae")
    filepath: str = Field(None, description="File path")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    level: str = Field(None, description="Level of road")
    created_at: datetime = Field(None, description="Created at")
    
    def change_path(self):
        self.filepath = f"/datasvc/api/getImage?imagePath={self.filepath}"
        return self