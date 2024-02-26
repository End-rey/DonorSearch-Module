from aiogram import F, Router, types
from aiogram.filters import Command
from aiogram.fsm.state import State, StatesGroup
from aiogram.filters.state import StateFilter
from aiogram.fsm.context import FSMContext
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.bloodcentre import bloodcentre_orm_handlres
from app.keyboards.reply import get_reply_keyboard
from app.common import keyboards

user_private_router = Router()

keyboard_location = get_reply_keyboard(
    "Указать город", "Дать свое местоположение", reqest_location=1, sizes=(2,))

keyboard_back = get_reply_keyboard("Отмена", sizes=(2,))

class City(StatesGroup):
    select_city = State()
    waiting_for_city = State()

@user_private_router.message(F.text == "Список центров сдачи крови")
async def bloodcentres_handler(message: types.Message, state: FSMContext) -> None:
    await message.answer("Укажите город или свой местоположение", reply_markup=keyboard_location)
    await state.set_state(City.select_city)


@user_private_router.message(F.text == "Указать город", City.select_city)
async def set_city_handler(message: types.Message, state: FSMContext) -> None:
    await message.answer("Пожалуйста, выберите свой город", reply_markup=keyboard_back)
    await state.set_state(City.waiting_for_city)

@user_private_router.message(F.text == "Отмена", City.waiting_for_city)
async def back_handler(message: types.Message, state: FSMContext) -> None:
    state_keyboard = "" if 'keyboard' not in (await state.get_data()) else (await state.get_data())['keyboard']
    reply_murkup = keyboards.keyboard_profile if (state_keyboard == "profile") else keyboards.keyboard_login_register
    await message.answer("Отменено", reply_markup=reply_murkup)
    await state.clear()

@user_private_router.message(City.waiting_for_city)
async def handle_city(message: types.Message, session: AsyncSession, state: FSMContext) -> None:
    city = await bloodcentre_orm_handlres.get_city_by_name(session, message.text)
    if city:
        await message.answer(f"Ваш город: {city.name}", reply_markup=types.ReplyKeyboardRemove())
        await bloodcentres(message, session, state, city_id=city.id)
        await state.clear()
    else:
        await message.answer("Такого города не нашли =(", reply_markup=keyboard_back)
        await state.set_state(City.waiting_for_city)
        

@user_private_router.message(F.content_type == types.ContentType.LOCATION, City.select_city)
async def handle_location(message: types.Message, session: AsyncSession, state: FSMContext) -> None:
    latitude = message.location.latitude
    longitude = message.location.longitude
    state_keyboard = "" if 'keyboard' not in (await state.get_data()) else (await state.get_data())['keyboard']
    reply_murkup = keyboards.keyboard_profile if (state_keyboard == "profile") else keyboards.keyboard_login_register
    city = await bloodcentre_orm_handlres.get_city_by_coordinates(session, latitude, longitude)
    if city:
        await message.answer(f"Ваш город: {city.name}", reply_markup=reply_murkup)
        await bloodcentres(message, session, state, city_id=city.id)
    else:
        await message.answer("Не получилось =(, повторите позже", reply_markup=reply_murkup)
    await state.clear()

async def bloodcentres(message: types.Message, session: AsyncSession, state: FSMContext, city_id: int):
    bloodcentres = await bloodcentre_orm_handlres.get_blood_centres_by_city(session, city_id=city_id)
    state_keyboard = "" if 'keyboard' not in (await state.get_data()) else (await state.get_data())['keyboard']
    reply_murkup = keyboards.keyboard_profile if (state_keyboard == "profile") else keyboards.keyboard_login_register
    if bloodcentres:
        for bloodcentre in bloodcentres:
            await message.answer(f"Название: {bloodcentre.name}, \
                                 \nАдрес: {bloodcentre.address}, \
                                 \nТелефон: {bloodcentre.phone_numbers}, \
                                 \nРасписание: {bloodcentre.schedule}",
                                 reply_markup=reply_murkup)
    else:
        await message.answer("Не нашли центров сдачи крови в этом городе", reply_markup=reply_murkup)
    await state.clear()
    

@user_private_router.message()
async def echo_handler(message: types.Message) -> None:
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer("Nice try!")
