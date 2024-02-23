from aiogram import Router, types
from aiogram.filters import CommandStart, Command
from aiogram.utils.markdown import hbold


webapp_router = Router()

web_app = types.WebAppInfo(url="https://end-rey.github.io/DonorSearch-Module/")
# web_app = types.WebAppInfo(url="https://31.129.45.151/")

keyboard = types.InlineKeyboardMarkup(
    inline_keyboard=[
        [types.InlineKeyboardButton(text="👉 На сайт", web_app=web_app)]
    ]
)


@webapp_router.message(Command("site"))
async def main_site_handler(message: types.Message) -> None:
    await message.answer(f"DonorSearch!", reply_markup=keyboard)
