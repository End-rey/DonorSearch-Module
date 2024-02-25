from aiogram import types
from typing import Optional
from aiogram.filters import Filter
from app.common.AuthUser import AuthUser

auth_user = AuthUser()

class whatWebApp(Filter):
    def __init__(self, name: str):
        self.name = name
        
    async def __call__(self, message: types.Message):
        return message.web_app_data.button_text == self.name