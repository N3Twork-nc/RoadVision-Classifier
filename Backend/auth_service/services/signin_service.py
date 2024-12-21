from schemas import Account
from .format_response import format_response 
from JWT import Authentication

def signin_service(account: Account,role=None):
    try:
        if account.checkAccount():
            if role is not None and not account.checkRole(role):
                return format_response(
                    status="Failed",
                    data={},
                    message=f"User have not {role} role",
                    status_code=403
                )
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
                message="User not found",
                status_code=404
            )
    except Exception as e:
        print(e)
        return format_response(
            status="Error",
            data=None,
            message="Failed in login process",
            status_code=500
        )
def authorization_service(username: str, role: str = None):
    if role is None:
        response={
            "status":"Success",
            "message":"Token is valid",
            "data":{
                "username":username
            }
        }
        return response
    else:
        account = Account(username=username)
        if account.checkRole(role):
            return format_response(
                status="Success",
                data={"username": username, "role": role},
                message="Authorization success",
                status_code=200
            )
        else:
            return format_response(
                status="Failed",
                data={"username": username, "role": role},
                message="User have not role",
                status_code=403
           )