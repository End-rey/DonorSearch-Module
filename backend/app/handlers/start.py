import json
from aiogram import Router, types
from aiogram.filters import CommandStart, CommandObject
from aiogram.utils.markdown import hbold

from sqlalchemy.ext.asyncio import AsyncSession

from app.keyboards.inline import get_callback_btns
from app.database.orm_query import login_user
from app.keyboards.reply import get_reply_keyboard


start_router = Router()
web_app = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/auth")
keyboard = get_reply_keyboard(
    "Вход / Регистрация", web_app={0: web_app}, sizes=(1,))


@start_router.message(CommandStart())
async def command_start_handler(message: types.Message) -> None:
    await message.answer(f"Привет, {hbold(message.from_user.full_name)}!", reply_markup=keyboard)


@start_router.message()
async def webapp_data_handler(message: types.Message, session: AsyncSession) -> None:
    data = json.loads(
        message.web_app_data.data) if message.web_app_data.data else None
    user = await login_user(session=session, dict=data)
    if user:
        await message.answer("Добро пожаловать!", reply_markup=types.ReplyKeyboardRemove())
    else:
        await message.answer("Неверные данные!", reply_markup=keyboard)
