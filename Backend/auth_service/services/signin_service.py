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

    # async def insertAccount(self, connection):
    #     hashed_password = compute_hash(self.password)
    #     query = """
    #         INSERT INTO account (username, email, password) 
    #         VALUES ($1, $2, $3)
    #     """
    #     await connection.execute(query, self.username, self.email, hashed_password)

    async def checkAccount(self, connection) -> bool:
        query = """
            SELECT password FROM account WHERE username = $1
        """
        account = await connection.fetchrow(query, self.username)
        if account is None or account['password'] != compute_hash(self.password):
            return False
        return True

    async def insertOTP(self, connection, OTP: str):
        query = """
            INSERT INTO otp (username, otp, email) 
            VALUES ($1, $2, $3, $4)
        """
        await connection.execute(query, self.username, OTP, self.email)

    async def verifyEmail(self, connection) -> bool:
        try:
            query = """
                SELECT otp FROM otp WHERE username = $1
            """
            otp_record = await connection.fetchrow(query, self.username)
            if otp_record and otp_record['otp'] == self.OTP:
                delete_query = """
                    DELETE FROM otp WHERE username = $1
                """
                await connection.execute(delete_query, self.username)
                return True
        except:
            return False
        return False


    # async def existenceUsername(self, connection) -> bool:
    #     query = """
    #         SELECT 1 FROM account WHERE username = $1
    #     """
    #     result = await connection.fetchrow(query, self.username)
    #     return result is not None

    # async def existenceEmail(self, connection) -> bool:
    #     query = """
    #         SELECT 1 FROM account WHERE email = $1
    #     """
    #     result = await connection.fetchrow(query, self.email)
    #     return result is not None

    async def getInfoAccount(self, connection) -> dict:
        query = """
            SELECT id, email, username FROM account WHERE username = $1
        """
        info = await connection.fetchrow(query, self.username)
        return dict(info) if info else {}
