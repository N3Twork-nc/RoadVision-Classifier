from pydantic import BaseModel
import hashlib

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

    # def insertAccount(self, cursor):
    #     hashed_password = compute_hash(self.password)
    #     query = """
    #         INSERT INTO account (username, email, password) 
    #         VALUES (%s, %s, %s)
    #     """
    #     cursor.execute(query, (self.username, self.email, hashed_password))

    # def insertOTP(self, cursor, OTP: str):
    #     query = """
    #         INSERT INTO otp (username, otp, email) 
    #         VALUES (%s, %s, %s)
    #     """
    #     cursor.execute(query, (self.username, OTP, self.email))

    # def verifyEmail(self, cursor) -> bool:
    #     try:
    #         query = "SELECT otp FROM otp WHERE username = %s"
    #         cursor.execute(query, (self.username,))
    #         otp_record = cursor.fetchone()
    #         if otp_record and otp_record[0] == self.OTP:
    #             delete_query = "DELETE FROM otp WHERE username = %s"
    #             cursor.execute(delete_query, (self.username,))
    #             return True
    #     except:
    #         return False
    #     return False

    # def existenceUsername(self, cursor) -> bool:
    #     query = "SELECT 1 FROM account WHERE username = %s"
    #     cursor.execute(query, (self.username,))
    #     result = cursor.fetchone()
    #     return result is not None

    # def existenceEmail(self, cursor) -> bool:
    #     query = "SELECT 1 FROM account WHERE email = %s"
    #     cursor.execute(query, (self.email,))
    #     result = cursor.fetchone()
    #     return result is not None