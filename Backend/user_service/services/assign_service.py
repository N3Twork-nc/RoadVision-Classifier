from schemas import Task
from datetime import datetime
from .format_response import format_response
from fastapi import HTTPException, status

class AssignService:
    @staticmethod
    def assign_task_service(task: Task, user_info: dict):
        if user_info.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action."
            )

        try:
            success, fullname, district_name, province_name, status = task.assign_task()

            if not success:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Task assignment failed due to invalid user or role."
                )

            if not district_name or not province_name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="District or province information is missing."
                )

            if not task.deadline:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Deadline is missing."
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
                    "status": status,
                    "deadline": formatted_deadline
                },
                message="Task assigned successfully.",
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
                message="An error occurred while assigning task.",
                status_code=500
            )
        
    @staticmethod
    def update_status_assignment_service(user_id: int, ward_id: int, status: str, user_info: dict):
        if user_info.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to update assignment status"
            )

        try:
            task = Task(username=user_info.get("username"))
            success = task.update_status_assignment(status, user_id, ward_id)

            if not success:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to update assignment status"
                )

            return format_response(
                status="Success",
                data={
                    "user_id": user_id,
                    "ward_id": ward_id,
                    "status": status,
                    "updated_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                },
                message="Assignment status updated successfully",
                status_code=200
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
                message="An error occurred while updating assignment status",
                status_code=500
            )
    
    @staticmethod
    def update_status_road_service(road_id: int, status: str, user_info: dict):
        if user_info.get("role") != "technical":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to update road status"
            )

        try:
            task = Task(username=user_info.get("username"))
            success = task.update_status_road(status, road_id)

            if not success:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to update road status"
                )

            return format_response(
                status="Success",
                data={
                    "road_id": road_id, 
                    "status": status,
                    "updated_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                },
                message="Road status updated successfully",
                status_code=200
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
                message="An error occurred while updating road status",
                status_code=500
            )