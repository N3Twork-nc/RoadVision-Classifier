from schemas import Task
from .format_response import format_response
from fastapi import HTTPException, status

class AssignService:
    @staticmethod
    def assign_task_service(task: Task, user_info: dict):
        if user_info.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action"
            )

        try:
            if task.assign_task():
                return format_response(
                    status="Success",
                    data={"username": task.username, "ward_name": task.ward_name, "deadline": task.deadline},
                    message="Task assigned successfully",
                    status_code=201
                )
            else:
                return format_response(
                    status="Failed",
                    data=None,
                    message="Failed while assigning task",
                    status_code=500
                )
        except Exception as e:
            print(f"Error in assign task: {e}")
            return format_response(
                status="Error",
                data=None,
                message="An error occurred while assigning task",
                status_code=500
            )