
from typing import Optional, Self


class AuthUser(object):
    def __init__(self, user_id: Optional[int] = None):
        self.user_id = user_id
        self.city_id = None
    
    def __new__(cls) -> Self:
        if not hasattr(cls, 'instance'):
            cls.instance = super(AuthUser, cls).__new__(cls)
        return cls.instance