from Database import Postgresql
from pydantic import BaseModel

class User(BaseModel):
    username: str
    fullname: str = None
    avatar: str = None
    birthday: str = None
    gender: str = None
    phonenumber: str = None
    location: str = None
    state: str = None

    def update_user_info(self) -> bool:
        db = Postgresql()
        try:
            db.update(
                '"user"',
                f"""
                fullname = '{self.fullname}',
                avatar = '{self.avatar}',
                birthday = '{self.birthday}',
                gender = '{self.gender}',
                phonenumber = '{self.phonenumber}',
                location = '{self.location}',
                state = '{self.state}'
                """,
                f"username = '{self.username}'"
            )
            db.commit() 
            return True
        except Exception as e:
            print(f"Error updating user info: {e}")
            return False
        finally:
            db.close()

    def get_profile(self) -> dict:
        db = Postgresql()
        try:
            result = db.select(
                '"user"', 
                'username, fullname, avatar, birthday, gender, phonenumber, location, state',
                f"username = '{self.username}'"
            )
            if result:
                return {
                    "username": result[0][0],
                    "fullname": result[0][1],
                    "avatar": result[0][2],
                    "birthday": result[0][3],
                    "gender": result[0][4],
                    "phonenumber": result[0][5],
                    "location": result[0][6],
                    "state": result[0][7],
                }
            return {} 
        finally:
            db.close()

