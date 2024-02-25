import json
from aiogram import Router, types, F
from aiogram.filters import CommandStart, CommandObject, StateFilter, Command
from aiogram.utils.markdown import hbold
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext

from sqlalchemy.ext.asyncio import AsyncSession
from app.common.AuthUser import AuthUser

from app.database.users.user_orm_handlers import login_user, register_user
from app.filters.auth_filter import isAuth
from app.common.keyboards import keyboard_profile, keyboard_login_register

auth_user = AuthUser()

start_router = Router()

@start_router.message(CommandStart(), isAuth())
async def command_start_handler(message: types.Message) -> None:
    await message.answer(f"Ты уже вошел, {auth_user.user_id}!", reply_markup=keyboard_profile)


@start_router.message(CommandStart())
async def command_start_without_handler(message: types.Message) -> None:
    await message.answer(f"Зарегистрируйся или войди в свой аккаунт!", reply_markup=keyboard_login_register)


@start_router.message(F.content_type == "web_app_data", ~isAuth())
async def webapp_auth_handler(message: types.Message, session: AsyncSession) -> None:
    data = json.loads(message.web_app_data.data)
    if data['action'] == 'login':
        user = await login_user(session=session, dict=data)
        if user:
            auth_user.user_id = user.id
            await message.answer(f"Добро пожаловать, {auth_user.user_id}!", reply_markup=keyboard_profile)
        else:
            await message.answer("Неверные данные!", reply_markup=keyboard_login_register)
    elif data['action'] == 'register':
        user = await register_user(session=session, dict=data)
        if user:
            await message.answer("Регистрация прошла успешно!", reply_markup=keyboard_login_register)
        else:
            await message.answer("Пользователь с таким именем уже существует!", reply_markup=keyboard_login_register)
    else:
        await message.answer("Что-то пошло не так =(, повторите еще раз", reply_markup=keyboard_login_register)
        
