import os
from dotenv import load_dotenv
from fastapi import HTTPException
from main import app
from services import Account
from JWT import Authentication
import asyncpg


current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, '..', '..', '..', 'Database', 'PostgreSQL', 'env')

load_dotenv(dotenv_path=env_path)

@app.post('/APIsignin')
async def signin(request: Account):
    async with asyncpg.create_pool(
        user=os.getenv("POSTGRES_USER_DEV"),
        password=os.getenv("POSTGRES_PASSWORD_DEV"),
        database=os.getenv("POSTGRES_DB"),
        host=os.getenv("POSTGRES_HOST")
    ) as pool:
        async with pool.acquire() as connection:
            if await request.checkAccount(connection):
                token = Authentication().generate_token(request.username)
                
                info = await request.getInfoAccount(connection)
                info.pop('password', None)
                
                return {
                    'info': info,
                    'token': token
                }
            else:
                raise HTTPException(status_code=404, detail="User not found")
