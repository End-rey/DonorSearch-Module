import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import text

from app.config import DbConfig
from app.database.models import Base
from app.logger import get_logger
logger = get_logger()

class DB:
    def __init__(self, config: DbConfig):
        self.async_engine = create_async_engine(config.url, echo=True)

        self.async_session = async_sessionmaker(
            self.async_engine, class_=AsyncSession, expire_on_commit=False
        )

    async def create_db(self):
        async with self.async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            
    async def drop_db(self):
        async with self.async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            
    async def execute_sql_file(self, file_path):
        async with self.async_engine.begin() as conn:
            with open(file_path, "r", encoding="utf-8") as file:
                logger.info(f"Executing SQL file: {file_path}")
                sql_commands = file.read().split(";")
                for sql_script in sql_commands:
                    if sql_script.strip():
                        await conn.execute(text(sql_script))

    async def execute_sql_files_in_directory(self, directory):
        for file_name in os.listdir(directory):
            if file_name.endswith(".sql"):
                file_path = os.path.join(directory, file_name)
                await self.execute_sql_file(file_path)