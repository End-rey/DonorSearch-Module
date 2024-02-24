import hashlib

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models import User
from app.logger import get_logger
logger = get_logger()

async def get_all_users(session: AsyncSession):
    return await session.execute(select(User))

async def get_user_by_id(session: AsyncSession, user_id: int):
    return await session.execute(select(User).where(User.id == user_id))

async def register_user(session: AsyncSession, dict: dict):
    if await session.execute(select(User).where(User.name == dict['username'])):
        logger.info("User already exists")
        return None
        
    hashed_password = hashlib.sha256(dict['password'].encode()).hexdigest()
    new_user = User(
        name=dict['username'],
        password=hashed_password,
    )
    session.add(new_user)
    await session.commit()
    return await session.execute(select(User).where(User.name == dict['username'])).id
    
async def login_user(session: AsyncSession, dict: dict):
    user = await session.execute(select(User).where(User.name == dict['username'])).first()
    
    if user and user.password == hashlib.sha256(dict['password'].encode()).hexdigest():
        return user

    return None