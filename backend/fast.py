import sys
import os

from aiohttp import web

from aiogram import Bot, Dispatcher, Router, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import FSInputFile, Message
from aiogram.utils.markdown import hbold
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

from aiogram.filters import CommandStart
from dotenv import load_dotenv
load_dotenv()

from web_app import routes as webapp_routes


TOKEN = os.environ["BOT_TOKEN"]
BACK_URL = os.environ["BACK_URL"]
REACT_URL = os.environ["FRONTEND_HOST"]

WEBHOOK_PATH = f"/bot/{TOKEN}"
WEBHOOK_URL = BACK_URL + WEBHOOK_PATH

router = Router()

@router.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {hbold(message.from_user.full_name)}!")


@router.message()
async def echo_handler(message: types.Message) -> None:
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer("Nice try!")


async def on_startup(bot: Bot) -> None:
    await bot.set_webhook(
        f"{WEBHOOK_URL}",
    )

def main() -> None:
    # Dispatcher is a root router
    dp = Dispatcher()
    # ... and all other routers should be attached to Dispatcher
    dp.include_router(router)

    # Register startup hook to initialize webhook
    dp.startup.register(on_startup)

    # Initialize Bot instance with a default parse mode which will be passed to all API calls
    bot = Bot(TOKEN, parse_mode=ParseMode.HTML)

    # Create aiohttp.web.Application instance
    app = web.Application()
    app.add_routes(webapp_routes)
    # Create an instance of request handler,
    # aiogram has few implementations for different cases of usage
    # In this example we use SimpleRequestHandler which is designed to handle simple cases
    webhook_requests_handler = SimpleRequestHandler(
        dispatcher=dp,
        bot=bot,
    )
    # Register webhook handler on application
    webhook_requests_handler.register(app, path=WEBHOOK_PATH)

    # Mount dispatcher startup and shutdown hooks to aiohttp application
    setup_application(app, dp, bot=bot)

    # Generate SSL context

    # And finally start webserver
    web.run_app(app, host="127.0.0.1", port=8080)

if __name__ == "__main__":
    main()
