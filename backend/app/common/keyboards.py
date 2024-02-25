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

web_app_notification = types.WebAppInfo(
    url="https://end-rey.github.io/DonorSearch-Module/notification"
)

keyboard_profile = get_reply_keyboard("Профиль",
                                      "Добавить донацию",
                                      "Напоминание о донации",
                                      "Мои напоминания",
                                      "Список центров сдачи крови",
                                      "Мои донации",
                                      "Выйти",
                                      web_app={
                                          0: web_up_profile,
                                          1: web_up_donation,
                                          2: web_app_notification
                                      }, sizes=(3, 3))


keyboard_login_register = get_reply_keyboard(
    "Вход / Регистрация", "Список центров сдачи крови", web_app={0: web_app_auth}, sizes=(1,))
