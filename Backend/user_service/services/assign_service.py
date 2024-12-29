from datetime import datetime
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
            success, fullname, district_name, province_name = task.assign_task()

            if not success:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="User not found or does not have 'technical' role."
                )

            if not district_name or not province_name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="District or province information is missing."
                )

            formatted_deadline = task.deadline.strftime('%d-%m-%Y %H:%M:%S')

            return format_response(
                status="Success",
                data={
                    "username": task.username,
                    "fullname": fullname if fullname else "N/A",
                    "ward_name": task.ward_name,
                    "district_name": district_name,
                    "province_name": province_name,
                    "deadline": formatted_deadline
                },
                message="Task assigned successfully",
                status_code=201
            )
        except HTTPException as e:
            return format_response(
                status="Error",
                data=None,
                message=e.detail,
                status_code=e.status_code
            )
        except Exception as e:
            return format_response(
                status="Error",
                data=None,
                message="An error occurred while assigning task",
                status_code=500
            )