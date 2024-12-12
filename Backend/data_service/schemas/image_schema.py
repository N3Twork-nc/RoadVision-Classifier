from pydantic import BaseModel, Field
from Database import Postgresql
from fastapi import UploadFile
import shutil
import time

class ImageSchema(BaseModel):
    user_id: int =Field(..., description="User own imgae")
    file: UploadFile = Field(..., description="File uploaded")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    

    def insertImage(self):
        db = Postgresql()
        file_path = f"roadImages/{self.user_id}_{time.time()}.jpg"
        db.insert("road",'user_id,image_path,latitude,longitude,level',f"{self.user_id},'{ile_path}',{self.latitude},{self.longitude},'{self.level}'")
        print(db.commit())
        db.close()
        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(self.file.file, buffer) 
        return true