from app.keyboards.reply import get_reply_keyboard
from aiogram import types


web_app_auth = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/auth")


web_up_profile = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/profile"
)
web_up_donation = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/"
)

keyboard_profile = get_reply_keyboard("Профиль", 
                                      "Запланировать донацию", 
                                      "Список центров сдачи крови",
                                      "Мои донации",
                                      "Выйти",
                                      web_app={
                                        0: web_up_profile,
                                        1: web_up_donation
                                      }, sizes=(2,2))


keyboard_login_register = get_reply_keyboard(
    "Вход / Регистрация", web_app={0: web_app_auth}, sizes=(1,))

