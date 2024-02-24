from aiogram import types
from aiogram.utils.keyboard import InlineKeyboardBuilder

def get_callback_btns(
        *,
        btns: dict[str, str],
        sizes: tuple[int] = (2,)
) -> types.InlineKeyboardMarkup:
    keyboard = InlineKeyboardBuilder()
    
    for text, data in btns.items():
        keyboard.add(types.InlineKeyboardButton(text=text, callback_data=data))
        
    return keyboard.adjust(*sizes).as_markup()