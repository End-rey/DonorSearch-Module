import os

import aiohttp_cors
from aiohttp import web

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

from aiogram.filters import CommandStart
from dotenv import load_dotenv
load_dotenv()

from web_app import routes as webapp_routes


import asyncio
import logging

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode

from app.config import load_config
from app.handlers.user_private import user_private_router
from app.handlers.start import start_router
from app.handlers.for_auth_handlers import auth_router
from app.common.bot_cmds_list import private
from app.database.engine import DB
from app.logger import get_logger
from app.middlewares.db import DatabaseMiddleware

logger = get_logger()
config = load_config(".env")

TOKEN = config.tg_bot.token
BACK_URL = config.tg_bot.back_host

WEBHOOK_PATH = f"/bot/{TOKEN}"
WEBHOOK_URL = BACK_URL + WEBHOOK_PATH


bot = Bot(token=TOKEN, parse_mode=ParseMode.HTML)

database = DB(config.db)

dp = Dispatcher()
dp.include_routers(
    start_router,
    auth_router,
    user_private_router
)

async def on_startup(bot):
    await database.create_db()
    if config.db.insert_data:
        await database.execute_sql_files_in_directory("./data")
    await bot.delete_webhook(drop_pending_updates=True)
    await bot.set_my_commands(commands=private, scope=types.BotCommandScopeAllPrivateChats())
    await bot.set_webhook(
        f"{WEBHOOK_URL}",
    )


def main() -> None:
    logger.info("Starting bot")
    dp.update.middleware(DatabaseMiddleware(
            session_pool=database.async_session))
    
    dp.startup.register(on_startup)
    
    app = web.Application()
    app.add_routes(webapp_routes)
    
    cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*"
        )
    })
    
    for route in list(app.router.routes()):
        cors.add(route)

    webhook_requests_handler = SimpleRequestHandler(
        dispatcher=dp,
        bot=bot,
    )

    webhook_requests_handler.register(app, path=WEBHOOK_PATH)

    setup_application(app, dp, bot=bot)

    web.run_app(app, host="127.0.0.1", port=8080)

if __name__ == "__main__":
    main()