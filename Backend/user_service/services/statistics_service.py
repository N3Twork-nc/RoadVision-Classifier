from schemas import User
from .format_response import format_response

class StatisticsService:
    @staticmethod
    def list_all_users(username: str):
        user = User(username=username)
        data = user.get_user_statistics()
        if not data:
            return format_response(
                status="Error",
                message="No user statistics found",
                status_code=404
            )
        return format_response(
            status="Success",
            data=data,
            message="User statistics retrieved successfully",
            status_code=200
        )

    @staticmethod
    def list_all_technicals(username: str):
        user = User(username=username)
        data = user.get_technical_statistics()
        if not data:
            return format_response(
                status="Error",
                message="No technical statistics found",
                status_code=404
            )
        return format_response(
            status="Success",
            data=data,
            message="Technical statistics retrieved successfully",
            status_code=200
        )