import asyncio
import logging

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.fsm.storage.redis import RedisStorage

from app.config import load_config
from app.handlers.user_private import user_private_router
from app.handlers.start import start_router
from app.handlers.for_auth_handlers import auth_router
from app.common.bot_cmds_list import private
from app.database.engine import DB
from app.logger import get_logger
from app.middlewares.db import DatabaseMiddleware
# from app.middlewares.redis import RedisMiddleware
# from app.redis.engine import RedisConnection

logger = get_logger()
config = load_config(".env")

bot = Bot(token=config.tg_bot.token, parse_mode=ParseMode.HTML)

database = DB(config.db)
redis_storage = RedisStorage.from_url(config.redis.url)

dp = Dispatcher(storage=redis_storage)
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


async def main():
    logger.info("Starting bot")

    try:
        dp.startup.register(on_startup)
        dp.update.middleware(DatabaseMiddleware(
            session_pool=database.async_session))
        # dp.update.middleware(RedisMiddleware(
        #     redis=redis_storage))
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    finally:
        await dp.storage.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.error("Bot stopped!")
