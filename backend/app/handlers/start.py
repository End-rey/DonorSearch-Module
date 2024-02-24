import json
from aiogram import Router, types, F
from aiogram.filters import CommandStart, CommandObject, StateFilter, Command
from aiogram.utils.markdown import hbold
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext

from sqlalchemy.ext.asyncio import AsyncSession

from app.database.users.user_orm_handlers import login_user, register_user
from app.keyboards.reply import get_reply_keyboard

class UnauthorizedUser(StatesGroup):
    authorization = State()

start_router = Router()
web_app_auth = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/auth")

web_up_profile = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/profile"
)
web_up_donation = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/"
)

keyboard_login_reister = get_reply_keyboard(
    "Вход / Регистрация", web_app={0: web_app_auth}, sizes=(1,))

keyboard_profile = get_reply_keyboard("Профиль", "Список донаций", web_app={0: web_up_profile, 1: web_up_donation}, sizes=(2,))

@start_router.message(CommandStart(), StateFilter(None))
async def command_start_handler(message: types.Message, state: FSMContext) -> None:
    await message.answer(f"Привет, {hbold(message.from_user.full_name)}!", reply_markup=keyboard_login_reister)
    await state.set_state(UnauthorizedUser.authorization)


@start_router.message(F.content_type == "web_app_data", UnauthorizedUser.authorization)
async def webapp_data_handler(message: types.Message, session: AsyncSession, state: FSMContext) -> None:
    data = json.loads(message.web_app_data.data)
    if data['action'] == 'login':
        user = await login_user(session=session, dict=data)
        if user:
            await message.answer("Добро пожаловать!", reply_markup=keyboard_profile)
            await state.clear()
        else:
            await message.answer("Неверные данные!", reply_markup=keyboard_login_reister)
    elif data['action'] == 'register':
        user = await register_user(session=session, dict=data)
        if user:
            await message.answer("Регистрация прошла успешно!", reply_markup=keyboard_login_reister)
        else:
            await message.answer("Пользователь с таким именем уже существует!", reply_markup=keyboard_login_reister)
        
        
@start_router.message(F.content_type == "web_app_data")
async def donation_handler(message: types.Message) -> None:
    data = json.loads(message.web_app_data.data)
    await message.answer(f"Молодец, будешь сдавать {data['donationType']}!", reply_markup=keyboard_profile)
