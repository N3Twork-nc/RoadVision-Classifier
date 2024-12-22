from schemas import AddUser, Account
from .format_response import format_response
from psycopg2.errors import UniqueViolation

def create_user_service(request: AddUser, current_user: str):
    try:
        account = Account(username=current_user)
        if not account.checkRole("admin"):
            return format_response(
                status="Failed",
                data=None,
                message="Only admins can create new users",
                status_code=403
            )
        
        user_id = request.insert_user()
        if user_id:
            return format_response(
                status="Success",
                data={"username": request.username, "user_id": user_id},
                message="User created successfully",
                status_code=201
            )
        else:
            return format_response(
                status="Failed",
                data=None,
                message="Failed to create user",
                status_code=500
            )
    except UniqueViolation as uv: 
        print(f"Unique constraint error: {uv}")
        return format_response(
            status="Failed",
            data=None,
            message=f"Username '{request.username}' already exists",
            status_code=400
        )
    except Exception as e:
        print(f"Unexpected error: {e}")
        return format_response(
            status="Error",
            data=None,
            message="An error occurred during user creation",
            status_code=500
        )