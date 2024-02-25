import asyncio
import logging

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from app.common.AuthUser import AuthUser

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

bot = Bot(token=config.tg_bot.token, parse_mode=ParseMode.HTML)

database = DB(config.db)

dp = Dispatcher()
dp.include_routers(
    start_router,
    auth_router,
    user_private_router
)

async def on_startup(bot):
    await database.create_db()
    await bot.delete_webhook(drop_pending_updates=True)
    await bot.set_my_commands(commands=private, scope=types.BotCommandScopeAllPrivateChats())


async def main():
    logger.info("Starting bot")

    try:
        dp.startup.register(on_startup)
        dp.update.middleware(DatabaseMiddleware(
            session_pool=database.async_session))
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    finally:
        await dp.storage.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.error("Bot stopped!")
