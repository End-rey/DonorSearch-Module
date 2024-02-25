from aiogram import types
from typing import Optional
from aiogram.filters import Filter
from app.common.AuthUser import AuthUser

auth_user = AuthUser()

class isAuth(Filter):   
    async def __call__(self, message: types.Message):
        return auth_user.user_id is not None
    