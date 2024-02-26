from aiogram import types
from typing import Optional
from aiogram.filters import Filter
from app.common.AuthUser import AuthUser

users = AuthUser()

class isAuth(Filter):
    async def __call__(self, message: types.Message):
        return message.from_user.id in users.users
    