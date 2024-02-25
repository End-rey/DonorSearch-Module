import types
from aiogram import Router
import json

from aiogram import Router, types, F
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext
from aiogram.filters import StateFilter

from sqlalchemy.ext.asyncio import AsyncSession

from app.common.AuthUser import AuthUser
from app.filters.auth_filter import isAuth
from app.filters.what_webapp import whatWebApp
from app.database.donation import donation_orm_handlers
from app.database.bloodcentre import bloodcentre_orm_handlres
from app.common.keyboards import keyboard_profile, keyboard_login_register
from app.keyboards.inline import get_callback_btns
from app.keyboards.reply import get_reply_keyboard

auth_user = AuthUser()
auth_router = Router()

keyboard_location = get_reply_keyboard("Указать город", "Дать свое местоположение", reqest_location=1, sizes=(2,))

@auth_router.message(F.content_type == "web_app_data", isAuth(), whatWebApp("Профиль"))
async def webapp_profile_handler(message: types.Message) -> None:
    await message.answer("Ваш профиль", reply_markup=keyboard_profile)


@auth_router.message(F.content_type == "web_app_data", isAuth(), whatWebApp("Запланировать донацию"))
async def donation_handler(message: types.Message, session: AsyncSession) -> None:
    data = json.loads(message.web_app_data.data)
    data['user_id'] = auth_user.user_id
    donation_id = await donation_orm_handlers.add_donation(session, data)
    if donation_id:
        await message.answer("Запланировано!", reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)
        
@auth_router.message(F.text == "Мои донации", isAuth())
async def my_donation_handler(message: types.Message, session: AsyncSession) -> None:
    donations = await donation_orm_handlers.get_donations_by_user_id(session, user_id=auth_user.user_id)
    if donations:
        for donation in donations:
            await message.answer(f"Запланировано на {donation.date}, здача {donation.donation_type_id.name}", reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)

@auth_router.message(F.text == "Список центров сдачи крови", isAuth())
async def bloodcentres_handler(message: types.Message, session: AsyncSession) -> None:
    if auth_user.city_id is None:
        await message.answer("Укажите город или свой местоположение", reply_markup=keyboard_location)
        return
    bloodcentres = await bloodcentre_orm_handlres.get_blood_centres_by_city(session, city_id=auth_user.city_id)
    if bloodcentres:
        for bloodcentre in bloodcentres:
            await message.answer(f"Название: {bloodcentre.name}, \
                                 \nАдрес: {bloodcentre.address}, \
                                 \nТелефон: {bloodcentre.phone_numbers}, \
                                 \nРасписание: {bloodcentre.schedule}", 
                                 reply_markup=keyboard_profile)
    else:
        await message.answer("Что-то пошло не так =(, повторите позже", reply_markup=keyboard_profile)
    
class Sity(StatesGroup):
    waiting_for_sity = State()
    
@auth_router.message(F.text == "Указать город", isAuth(), StateFilter(None))
async def set_city_handler(message: types.Message, state: FSMContext) -> None:
    await message.answer("Пожалуйста, выберите свой город", reply_markup=types.ReplyKeyboardRemove())
    await state.set_state(Sity.waiting_for_sity)
    
@auth_router.message(Sity.waiting_for_sity, isAuth())
async def handle_sity(message: types.Message, session: AsyncSession, state: FSMContext) -> None:
    city = await bloodcentre_orm_handlres.get_city_by_name(session, message.text)
    if city:
        auth_user.city_id = city.id
        await message.answer(f"Ваш город: {city.name}", reply_markup=keyboard_profile)
    else:
        await message.answer("Не получилось =(, повторите позже", reply_markup=keyboard_profile)
    await state.clear()
        
@auth_router.message(F.content_type == types.ContentType.LOCATION, isAuth())
async def handle_location(message: types.Message, session: AsyncSession) -> None:
    latitude = message.location.latitude
    longitude = message.location.longitude
    city = await bloodcentre_orm_handlres.get_city_by_coordinates(session, latitude, longitude)
    if city:
        auth_user.city_id = city.id
        await message.answer(f"Ваш город: {city.name}", reply_markup=keyboard_profile)
    else:
        await message.answer("Не получилось =(, повторите позже", reply_markup=keyboard_profile)
        

@auth_router.message(F.text == "Выйти", isAuth())
async def my_donation_handler(message: types.Message) -> None:
    auth_user.user_id = None
    await message.answer("Вы вышли из аккаунта!", reply_markup=keyboard_login_register)