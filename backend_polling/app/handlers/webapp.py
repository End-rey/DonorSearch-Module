import json
from aiogram import Bot, Router, types, F
from aiogram.filters import Command
from app.keyboards.inline import get_inlineWebApp_btns
from app.keyboards.reply import get_reply_keyboard
from app.logger import get_logger

logger = get_logger()

webapp_router = Router()

web_app = types.WebAppInfo(url="https://end-rey.github.io/DonorSearch-Module/")
# web_app = types.WebAppInfo(url="https://31.129.45.151/")

keyboard = get_reply_keyboard("👉 На сайт", web_app={0: web_app}, sizes=(1,))

@webapp_router.message(Command("site"))
async def main_site_handler(message: types.Message) -> None:
    await message.answer(text="DonorSearch", reply_markup=keyboard)

@webapp_router.message(F.content_type == "web_app_data")
async def webapp_data_handler(message: types.Message) -> None:
    data = json.loads(message.web_app_data.data).get('username') if message.web_app_data.data else None
    logger.info(data)
    await message.answer(data, reply_markup=types.ReplyKeyboardRemove())