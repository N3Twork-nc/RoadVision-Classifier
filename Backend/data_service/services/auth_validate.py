import requests
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer
reusable_oauth2 = HTTPBearer(scheme_name='Authorization')


API_AUTHORIZATION_URL = "http://192.168.120.26/auth/api/authorization"

def validate_token(token=Depends(reusable_oauth2)):
    headers = {"Authorization": f"Bearer {token.credentials}"}
    try:
        response = requests.get(API_AUTHORIZATION_URL, headers=headers)
        if response.status_code == 200:
            return response.json().get("data", {})
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