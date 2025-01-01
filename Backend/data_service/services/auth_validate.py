import requests
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer
reusable_oauth2 = HTTPBearer(scheme_name='Authorization')


API_AUTHORIZATION_URL = "http://192.168.120.26/auth/api/authorization"

def validate_token(token=Depends(reusable_oauth2),checkRole=False):
    headers = {"Authorization": f"Bearer {token.credentials}"}
    try:
        response = requests.get(API_AUTHORIZATION_URL, headers=headers)
        if response.status_code == 200:
            if checkRole:
                return response.json().get("data", {}).get("role")
            return response.json().get("data", {}).get("username")
        else:
            raise HTTPException(
                status_code=response.status_code, 
                detail=response.json().get("message", "Token validation failed")
            )
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to connect to authorization service"
        )

        
def get_token_validator(checkRole: bool = False):
    def dependency(token=Depends(reusable_oauth2)):
        return validate_token(token, checkRole)
    return dependency
