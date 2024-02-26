import json
from aiogram import Router, types, F
from aiogram.filters import CommandStart, CommandObject, StateFilter, Command
from aiogram.utils.markdown import hbold
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext

from sqlalchemy.ext.asyncio import AsyncSession

from app.database.users.user_orm_handlers import login_user, register_user
from app.filters.auth_filter import isAuth
from app.common.keyboards import keyboard_profile, keyboard_login_register
from app.filters.what_webapp import whatWebApp
from app.common.AuthUser import AuthUser

users = AuthUser()

start_router = Router()

@start_router.message(CommandStart())
async def command_start_without_handler(message: types.Message, state: FSMContext) -> None:
    await state.update_data({'keyboard': 'register'})
    await message.answer(f"Зарегистрируйся или войди в свой аккаунт!", reply_markup=keyboard_login_register)


@start_router.message(F.content_type == "web_app_data", whatWebApp("Вход / Регистрация"))
async def webapp_auth_handler(message: types.Message, session: AsyncSession, state: FSMContext) -> None:
    data = json.loads(message.web_app_data.data)
    if data['action'] == 'login':
        user = await login_user(session=session, dict=data)
        if user:
            users.users.update({message.from_user.id: user.id})
            await state.update_data({'keyboard': 'profile'})
            await message.answer(f"Добро пожаловать!", reply_markup=keyboard_profile)
        else:
            await message.answer("Неверные данные!", reply_markup=keyboard_login_register)
    elif data['action'].startswith('register'):
        user = await register_user(session=session, dict=data)
        if user:
            await message.answer("Регистрация прошла успешно!", reply_markup=keyboard_login_register)
        else:
            await message.answer("Пользователь с таким именем уже существует!", reply_markup=keyboard_login_register)
    else:
        await message.answer("Что-то пошло не так =(, повторите еще раз", reply_markup=keyboard_login_register)
        
