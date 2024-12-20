from schemas import Account
from .format_response import format_response 
from JWT import Authentication

def signin_service(account: Account):
    if account.checkAccount():
        token = Authentication().generate_token(account.username)
        info = account.getInfoAccount()
        info.pop('password', None)
        
        return format_response(
            status="Success",
            data={"info": info, "token": token},
            message="Login successful",
            status_code=200
        )
    else:
        return format_response(
            status="Error",
            data=None,
            message="Login failed",
            status_code=404
        )
    
