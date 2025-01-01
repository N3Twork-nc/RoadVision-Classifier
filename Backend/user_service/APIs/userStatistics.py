from main import app
from fastapi import Depends
from services.statistics_service import StatisticsService
from services.auth_validate import validate_token

@app.get('/api/getUserStatistics')
def get_user_statistics(user_data: dict = Depends(validate_token)):
    return StatisticsService.list_all_users(user_data)

@app.get('/api/getTechnicalStatistics')
def get_technical_statistics(user_data: dict = Depends(validate_token)):
    return StatisticsService.list_all_technicals(user_data)