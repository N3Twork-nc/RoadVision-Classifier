from main import app
from fastapi import Depends
from services.statistics_service import StatisticsService
from services.auth_validate import validate_token

@app.get('/api/getUserStatistics')
def get_user_statistics(username: str = Depends(validate_token)):
    return StatisticsService.list_all_users(username)

@app.get('/api/getTechnicalStatistics')
def get_technical_statistics(username: str = Depends(validate_token)):
    return StatisticsService.list_all_technicals(username)