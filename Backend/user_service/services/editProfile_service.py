from schemas import User
from .format_response import format_response

class ProfileService:
    @staticmethod
    def edit_profile(user: User, username: str):
        if not username:
            return format_response(
                status="Error",
                message="Invalid token or unauthorized",
                status_code=401
            )

        user.username = username
        if not user.update_user_info():
            return format_response(
                status="Error",
                message="Failed to update profile",
                status_code=500
            )

        return format_response(
            status="Success",
            message="Profile updated successfully",
            status_code=200
        )

    @staticmethod
    def get_profile(username: str):
        user = User(username=username)
        info = user.get_profile()
        if not info:
            return format_response(
                status="Error",
                message="Profile not found",
                status_code=404
            )

        return format_response(
            status="Success",
            data=info,
            message="Profile retrieved successfully",
            status_code=200
        )
