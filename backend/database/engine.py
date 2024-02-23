import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from config import DbConfig
from sshtunnel import SSHTunnelForwarder


from database.models import Base

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