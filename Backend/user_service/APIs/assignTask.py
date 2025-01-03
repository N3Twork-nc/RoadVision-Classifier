from main import app
from fastapi import Depends, Query
from schemas.user_schemas import Task
from services.assign_service import AssignService
from services.auth_validate import validate_token

@app.post('/api/assignTask')
def assign_task(task: Task, user_info: dict = Depends(validate_token)):
    return AssignService.assign_task_service(task, user_info)

@app.post('/api/updateStatus')
def update_status(user_info: dict = Depends(validate_token), status: str = Query(...), user_id: int = None, road_id: int = None, ward_id: int = None):
    return AssignService.update_status_service(user_info, status, user_id, road_id, ward_id)