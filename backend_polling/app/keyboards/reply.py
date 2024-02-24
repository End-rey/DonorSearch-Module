from typing import Dict
from aiogram import types
from aiogram.utils.keyboard import ReplyKeyboardBuilder

def get_reply_keyboard(
    *btns: str,
    placeholder: str = "Выберите...",
    reqest_location: int = None,
    web_app: Dict[int, types.WebAppInfo] = None,
    sizes: tuple[int] = (2,),
) -> types.ReplyKeyboardMarkup:

    keyboard = ReplyKeyboardBuilder()
    
    for index, text in enumerate(btns, start=0):
        
        if reqest_location and index == reqest_location:
            keyboard.add(types.KeyboardButton(text=text, request_location=True))
        elif web_app and index in web_app.keys():
            keyboard.add(types.KeyboardButton(text=text, web_app=web_app[index]))
        else:
            keyboard.add(types.KeyboardButton(text=text))
            
    return keyboard.adjust(*sizes).as_markup(resize_keyboard=True, input_field_placeholder=placeholder)
