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

    def checkAccount(self, cursor) -> bool:
        query = "SELECT password FROM account WHERE username = %s"
        cursor.execute(query, (self.username,))
        account = cursor.fetchone()
        if account is None or account[0] != compute_hash(self.password):
            return False
        return True

    def getInfoAccount(self, cursor) -> dict:
        query = "SELECT id, email, username FROM account WHERE username = %s"
        cursor.execute(query, (self.username,))
        info = cursor.fetchone()
        return {"id": info[0], "email": info[1], "username": info[2]} if info else {}


    def insertAccount(self, OTP: str):
        db=Postgresql()
        result=db.insert('account', 'username, password ,email,verified', f"'{self.username}', '{compute_hash(self.password)}','{self.email}', {OTP}")
        db.commit()
        db.close()
        return result

    def verifyEmail(self) -> bool:
        db=Postgresql()
        result=db.select('account', '1', f"email = '{self.email}' and verified = '{self.OTP}'")
        if result is None:
            return False
        db.update('account', f"active = true", f"email = '{self.email}'")
        db.commit()
        db.close()
        return True

    def existenceUsername(self) -> bool:
        db=Postgresql()
        result=db.select('account', 'username', f"username = '{self.username}'")
        db.close()
        return result is not None

    def existenceEmail(self) -> bool:
        db=Postgresql()
        result=db.select('account', 'email', f"email = '{self.email}'")
        db.close()
        return result is not None