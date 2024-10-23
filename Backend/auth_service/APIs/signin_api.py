from fastapi import HTTPException
from auth_service import app
from auth_service.services import Account
from auth_service.JWT import Authentication
import asyncpg  

# Đăng nhập
@app.post('/APIsignin')
async def signin(request: Account):
    async with asyncpg.create_pool(user='db_user', password='db_password',
                                   database='db_name', host='localhost') as pool:
        async with pool.acquire() as connection:
            result = await request.checkAccount(connection)
            if result:
                token = Authentication().generate_token(request.username)
                
                info = await request.getInfoAccount(connection)
                info.pop('password', None)
                
                return {
                    'info': info,
                    'token': token
                }
            else:
                raise HTTPException(status_code=404, detail="User not found")
