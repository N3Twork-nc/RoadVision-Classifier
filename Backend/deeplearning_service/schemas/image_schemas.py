from pydantic import BaseModel, Field
from Database import Postgresql
from fastapi import UploadFile
import shutil
import torch

class ImageSchema(BaseModel):
    user_id: int =Field(..., description="User own imgae")
    file: UploadFile = Field(..., description="File uploaded")
    filepath: str = Field(None, description="Path of the uploaded file")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    level: str = Field(None, description="Level of road")
    

    def insertImage(self):
        with open("test.jpg", "wb") as buffer:
            shutil.copyfileobj(self.file.file, buffer) 
        return None