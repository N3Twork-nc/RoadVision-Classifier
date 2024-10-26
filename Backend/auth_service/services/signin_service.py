import os
import psycopg2
from dotenv import load_dotenv
from schemas.account_schemas import Account
from .format_response import format_response 
from JWT import Authentication
from fastapi import HTTPException

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'Database', 'PostgreSQL', '.env')
load_dotenv(dotenv_path=env_path)

DB_CONFIG = {
    "user": os.getenv("POSTGRES_USER_DEV"),
    "password": os.getenv("POSTGRES_PASSWORD_DEV"),
    "dbname": os.getenv("POSTGRES_DB"),
    "host": os.getenv("POSTGRES_HOST"),
    "port": os.getenv("POSTGRES_PORT")
}

def signin_service(account: Account):
    with psycopg2.connect(**DB_CONFIG) as conn, conn.cursor() as cursor:
        if account.checkAccount(cursor):
            token = Authentication().generate_token(account.username)
            info = account.getInfoAccount(cursor)
            info.pop('password', None)
            
            return format_response(
                status="success",
                data={"info": info, "token": token},
                message="Login successful",
                status_code=200
            )
        else:
            return format_response(
                status="error",
                data=None,
                message="User not found",
                status_code=404
            )
