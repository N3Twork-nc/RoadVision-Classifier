from main import app
from fastapi import Depends
from schemas.user_schemas import Task
from services.assign_service import AssignService
from services.auth_validate import validate_token

@app.post('/api/assignTask')
def assign_task(task: Task, user_info: dict = Depends(validate_token)):
    return AssignService.assign_task_service(task, user_info)