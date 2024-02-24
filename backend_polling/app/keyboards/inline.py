
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

def get_inlineWebApp_btns(
        *,
        btns: dict[str, types.WebAppInfo],
        sizes: tuple[int] = (2,)
) -> types.InlineKeyboardMarkup:
    keyboard = InlineKeyboardBuilder()
    
    for text, webapp in btns.items():
        keyboard.add(types.InlineKeyboardButton(text=text, webapp=webapp))
        
    return keyboard.adjust(*sizes).as_markup()

def get_inlineMix_webApp_callback_btns(
        *,
        btns: dict[str, types.WebAppInfo | str],
        sizes: tuple[int] = (2,)
) -> types.InlineKeyboardMarkup:
    keyboard = InlineKeyboardBuilder()
    
    for text, value in btns.items():
        if isinstance(value, str):
            keyboard.add(types.InlineKeyboardButton(text=text, callback_data=value))
        else:
            keyboard.add(types.InlineKeyboardButton(text=text, webapp=value))
            
        
    return keyboard.adjust(*sizes).as_markup()