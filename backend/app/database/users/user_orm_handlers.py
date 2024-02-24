import datetime
import hashlib

from psycopg2 import IntegrityError

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.users.User import User
from app.logger import get_logger
logger = get_logger()


async def get_all_users(session: AsyncSession):
    return await session.execute(select(User))


async def get_user_by_id(session: AsyncSession, user_id: int):
    result = await session.execute(select(User).filter(User.id == user_id))
    user = result.scalars().first()
    return user


async def get_user_by_username(session: AsyncSession, username):
    result = await session.execute(select(User).filter(User.username == username))
    user = result.scalars().first()
    return user


async def register_user(session: AsyncSession, dict: dict):
    user = await session.execute(select(User).where(User.first_name == dict['first_name']))
    if user.scalar() is not None:
        logger.info("User already exists")
        return None

    try:
        date_joined = datetime.datetime.now()
        hashed_password = hashlib.sha256(dict['password'].encode()).hexdigest()
        new_user = User(
            username=dict['first_name'],
            first_name='',
            email=dict['email'],
            phone='',
            password=hashed_password,
        )
        session.add(new_user)
        await session.commit()
        # (await session.execute(select(User).where(User.name == dict['username']))).id
        return new_user.id
    except IntegrityError:
        session.rollback()
        return None


async def login_user(session: AsyncSession, dict: dict):
    user = await session.execute(select(User).where(User.username == dict['username']))
    user = user.scalar()
    if user is not None and user.password == hashlib.sha256(dict['password'].encode()).hexdigest():
        return user

    return None


async def update_user(session: AsyncSession, user_id, **kwargs):
    stmt = update(User).where(User.id == user_id).values(**kwargs)
    await session.execute(stmt)
    await session.commit()
