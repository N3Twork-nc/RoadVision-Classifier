import os
from datetime import datetime, timedelta
from typing import Union,Any
import jwt
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from pydantic import ValidationError
from fastapi import Depends, HTTPException

reusable_oauth2 = HTTPBearer(scheme_name='Authorization')

class Authentication:
    def __init__(self):
        self.SECRET_KEY="71d242901cca21e4ac52adab1cc5e7322cbadf7e432991fffa331ba46d4f2de9892fb76c1ffd5b140b03ba44a0bee009c303d82fac35d15ffcb4a8950f303f1057a921e193b2352d7451979d397a5273b867489bb28f817e972ed8c90cc1e1630321548b02ff19902d1a248525c45ab3ffab0077cdf11fab59bb9d74327a97279474f2f43ddfc1884187b994fbe8e44e237c17f4d6ee7dcb3ab0e8976d6065e012a7addd8b06fb8dc388d2787f69142d55eef203850395262be16be09c3269b55610d6a52a72180b43f924e743972420af8a93b510e913d3dabc234ab75b3cef3d2c66bace05f1b52037b06c898a7b23d62fd2d74465a571fea5cb3c9b5f4572"
        self.SECURITY_ALGORITHM="HS256"

    #create JWT    
    def generate_token(self,username: Union[str, Any]) -> str:
        expire = datetime.utcnow() + timedelta(
            seconds=60 * 60 * 24 * 3  # Expired after 3 days
        )
        to_encode = {
            "exp": expire, "username": username
        }
        encoded_jwt = jwt.encode(to_encode,self.SECRET_KEY, algorithm=self.SECURITY_ALGORITHM)
        return encoded_jwt
    
    #validate_token JWT
    def validate_token(self,http_authorization_credentials=Depends(reusable_oauth2)) -> str:
        try:
            payload = jwt.decode(http_authorization_credentials.credentials, self.SECRET_KEY, algorithms=[self.SECURITY_ALGORITHM])
            if datetime.fromtimestamp(payload['exp']) < datetime.now():
                raise HTTPException(status_code=403, detail="Token expired")
            return payload.get('username')
        except(jwt.PyJWTError, ValidationError):
            raise HTTPException(
                status_code=403,
                detail=f"Could not validate credentials",
            )