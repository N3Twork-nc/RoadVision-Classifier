from pydantic import BaseModel, Field
from Database import Postgresql
from fastapi import UploadFile
import shutil
import time

class ImageSchema(BaseModel):
    user_id: int =Field(..., description="User own imgae")
    file: bytes = Field(..., description="File uploaded")
    latitude: float = Field(..., description="Latitude of the location")
    longitude: float = Field(..., description="Longitude of the location")
    

    def insertImage(self):
        db = Postgresql()
        file_path = f"roadImages/{self.user_id}_{time.time()}.jpg"
        cursor=db.insert("road",'user_id,image_path,latitude,longitude,level',
            f"{self.user_id},'{file_path}',{self.latitude},{self.longitude},'classifing'",
            fetch='one',
            returning='RETURNING id'
        )
        db.commit()
        db.close()
        with open(file_path , "wb") as f:
            f.write(self.file)
        return cursor