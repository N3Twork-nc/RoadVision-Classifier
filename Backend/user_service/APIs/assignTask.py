from main import app
from fastapi import Depends
from schemas.user_schemas import Task
from services.assign_service import AssignService
from services.auth_validate import validate_token

@app.post('/api/assignTask')
def assign_task(task: Task, user_info: dict = Depends(validate_token)):
    return AssignService.assign_task_service(task, user_info)

@app.post('/api/updateStatusAssignment')
def update_status_assignment(user_id: int, ward_id: int, status: str, user_info: dict = Depends(validate_token)):
    return AssignService.update_status_assignment_service(user_id, ward_id, status, user_info)

@app.post('/api/updateStatusRoad')
def update_status_road(road_id: int, status: str, user_info: dict = Depends(validate_token)):
    return AssignService.update_status_road_service(road_id, status, user_info)
