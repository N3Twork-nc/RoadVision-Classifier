from pydantic import BaseModel, Field, root_validator
from Database import Postgresql
from datetime import datetime
import time
import os
from PIL import Image
from io import BytesIO
current_file_path = os.path.abspath(__file__)


class RoadSchema(BaseModel):
    id: int = Field(None, description="Id of the image")
    user_id: int =Field(None, description="User own imgae")
    username: str = Field(None, description="Username")
    file: bytes = Field(None, description="Image file")
    filepath: str = Field(None, description="File path")
    latitude: float = Field(None, description="Latitude of the location")
    longitude: float = Field(None, description="Longitude of the location")
    level: str = Field(None, description="Level of road")
    created_at: datetime = Field(None, description="Created at")
    district_id: int = Field(None, description="District id")
    location: str = Field("unknow", description="Location")
    
    @root_validator(pre=True)
    def resolve_user_id(cls, values):
        if not values.get('user_id') and values.get('username'):
            db = Postgresql()
            username = values['username']
            result = db.execute(f"SELECT id FROM account WHERE username ='{username}'", fetch='one')
            if result:
                values['user_id'] = result[0]
            else:
                raise ValueError(f"Username '{username}' không tồn tại trong cơ sở dữ liệu.")
        if values.get('file'):
            image = Image.open(BytesIO(values['file']))
            resized_image = image.resize((512,512), Image.LANCZOS)
            output_buffer = BytesIO()
            resized_image.save(output_buffer, format=image.format) 
            values["file"] = output_buffer.getvalue()
        return values

    def insertRoad(self):
        db = Postgresql()
        file_path = f"roadImages/{self.user_id}_{time.time()}.jpg"
        id=db.execute(f"INSERT INTO road (user_id,image_path,latitude,longitude,level,district_id) VALUES ({self.user_id},'{file_path}',{self.latitude},{self.longitude},'classifing',{self.district_id}) RETURNING id")
        db.commit()
        db.close()
        with open(file_path , "wb") as f:
            f.write(self.file)
        return id
        
    def deleteRoad(self):
        try:
            db = Postgresql()
            os.remove(self.filepath)
            db.execute(f"DELETE FROM road WHERE id={self.id}",fetch='none')
            db.commit()
            db.close()
            return True
        except Exception as e:
            print(current_file_path, e)
            return False
    
    def reformat(self):
        self.filepath = f"/datasvc/api/getImage?imagePath={self.filepath}"
        return self