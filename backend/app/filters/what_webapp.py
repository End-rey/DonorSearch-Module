from aiogram import types
from aiogram.filters import Filter

class whatWebApp(Filter):
    def __init__(self, name: str):
        self.name = name
        
    async def __call__(self, message: types.Message):
        return message.web_app_data.button_text == self.name