from pydantic import BaseModel
import hashlib
from Database import Postgresql

def compute_hash(data: str) -> str:
    hash_object = hashlib.sha256()
    hash_object.update(data.encode('utf-8'))
    return hash_object.hexdigest()

class Account(BaseModel):
    username: str
    password: str
    email: str = None
    OTP: str = None

    def checkAccount(self) -> bool:
        db = Postgresql()
        result = db.select('account', '*', f"username = '{self.username}' and password = '{compute_hash(self.password)}'")
        db.close()
        return result is not None

    def getInfoAccount(self) -> dict:
        db = Postgresql()
        info = db.select('account', 'id, email, username', f"username = '{self.username}'")
        return {"id": info[0], "email": info[1], "username": info[2]} if info else {}

    def insertAccount(self, OTP: str):
        db = Postgresql()
        result = db.insert('account', 'username, password ,email,verified', f"'{self.username}', '{compute_hash(self.password)}','{self.email}', {OTP}")
        db.commit()
        db.close()
        return result

    def verifyEmail(self) -> bool:
        db = Postgresql()
        result = db.select('account', '1', f"email = '{self.email}' and verified = '{self.OTP}'")
        if result is None:
            return False
        db.update('account', f"active = true", f"email = '{self.email}'")
        db.commit()
        db.close()
        return True

    def existenceUsername(self) -> bool:
        db = Postgresql()
        result = db.select('account', 'username', f"username = '{self.username}'")
        db.close()
        return result is not None

    def existenceEmail(self) -> bool:
        db = Postgresql()
        result = db.select('account', 'email', f"email = '{self.email}'")
        db.close()
        return result is not None

    def updatePassword(self, new_password: str):
        db = Postgresql()
        db.update('account', f"password = '{compute_hash(new_password)}'", f"email = '{self.email}'")
        db.commit()
        db.close()

class ChangePassword(BaseModel):
    username: str
    current_password: str
    new_password: str
    confirm_password: str

    def changePassword(self, new_password: str):
        db = Postgresql()
        db.update('account', f"password = '{compute_hash(new_password)}'", f"username = '{self.username}'")
        db.commit()
        db.close()
