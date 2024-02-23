import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher, Router, types
from aiogram.enums import ParseMode

from config import load_config
from handlers.user_private import user_private_router
from handlers.on_startup import command_start_handler, on_startup_router
from handlers.webapp import webapp_router
from common.bot_cmds_list import private
from filters.admin_filter import AdminFilter
from database.engine import DB

logger = logging.getLogger(__name__)
config = load_config(".env")

bot = Bot(token=config.tg_bot.token, parse_mode=ParseMode.HTML)

database = DB(config.db)

dp = Dispatcher()
# webapp_router.message.filter(AdminFilter(config.tg_bot.admin_id))
dp.include_router(webapp_router)
dp.include_router(on_startup_router)
dp.include_router(user_private_router)

async def on_startup(bot):
    await database.create_db()
    await bot.delete_webhook(drop_pending_updates=True)
    await bot.set_my_commands(commands=private, scope=types.BotCommandScopeAllPrivateChats())

async def main():
    logging.basicConfig(
        level=logging.INFO,
        format=u'%(filename)s:%(lineno)d #%(levelname)-8s [%(asctime)s] - %(name)s - %(message)s'
    )
    logger.info("Starting bot")
    
    try:
        dp.startup.register(on_startup)
        await dp.start_polling(bot)
    finally:
        await dp.storage.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.error("Bot stopped!")
