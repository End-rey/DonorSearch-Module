import types
from aiogram import Router
import json

from aiogram import Router, types, F
from aiogram.fsm.context import FSMContext
from aiogram.filters import CommandStart

from sqlalchemy.ext.asyncio import AsyncSession
from app.filters.auth_filter import isAuth

from app.filters.what_webapp import whatWebApp
from app.database.donation import donation_orm_handlers
from app.common.keyboards import keyboard_profile, keyboard_login_register
from app.middlewares.auth import AuthMiddleware
from app.common.AuthUser import AuthUser

users = AuthUser()

auth_router = Router()
auth_router.message.filter(isAuth())

@auth_router.message(CommandStart())
async def command_start_handler(message: types.Message) -> None:
    await message.answer(f"Ты уже вошел!", reply_markup=keyboard_profile)

@auth_router.message(F.content_type == "web_app_data", whatWebApp("Профиль"))
async def webapp_profile_handler(message: types.Message) -> None:
    await message.answer("Ваш профиль", reply_markup=keyboard_profile)


@auth_router.message(F.content_type == "web_app_data", whatWebApp("Добавить донацию"))
async def donation_handler(message: types.Message, session: AsyncSession) -> None:
    data = json.loads(message.web_app_data.data)
    data['user_id'] = users.users.get(message.from_user.id)
    donation_id = await donation_orm_handlers.add_donation(session, data)
    if donation_id:
        await message.answer("Запланировано!", reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)


@auth_router.message(F.text == "Мои напоминания")
async def my_notifications_handler(message: types.Message, session: AsyncSession) -> None:
    donations = await donation_orm_handlers.get_donations_from_now(session, user_id=users.users.get(message.from_user.id))
    if donations:
        for donation in donations:
            await message.answer(f"Запланировано на {donation.date}, здача {donation.donation_type_id.name}", reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)


@auth_router.message(F.text == "Мои донации")
async def my_donation_handler(message: types.Message, session: AsyncSession) -> None:
    donations = await donation_orm_handlers.get_donations_by_user_id(session, user_id=users.users.get(message.from_user.id))
    if donations:
        for donation in donations:
            await message.answer(f"Запланировано на {donation.date}, cдача {donation.donation_type_id.name}", reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)


@auth_router.message(F.text == "Выйти")
async def my_donation_handler(message: types.Message) -> None:
    users.users.pop(message.from_user.id)
    await message.answer("Вы вышли из аккаунта!", reply_markup=keyboard_login_register)
