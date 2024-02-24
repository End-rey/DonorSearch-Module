from aiogram import Router, types
from aiogram.filters import Command

user_private_router = Router()

list_of_commands = ["menu", "site", "user", "needs_stations"]

@user_private_router.message(Command("menu"))
async def menu_handler(message: types.Message) -> None:
    await message.answer("Menu")
    

@user_private_router.message()
async def echo_handler(message: types.Message) -> None:
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer("Nice try!")
