import datetime
import hashlib
import uuid

from sqlalchemy import select, update, or_
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
    email = dict['email'] if 'email' in dict else ""
    phone = dict['phone'] if 'phone' in dict else ""
    if email == "":
        query_param = User.phone == phone
    else:
        query_param = User.email == email
    user = await session.execute(select(User).where(query_param))
    user = user.scalar()
    if user is not None:
        logger.info("User already exists")
        return None

    try:
        date_joined = datetime.datetime.now()
        hashed_password = hashlib.sha256(dict['password'].encode()).hexdigest()
        new_user = User(
            date_joined=date_joined,
            username=str(uuid.uuid4()),
            first_name=dict['first_name'],
            email=email,
            phone=phone,
            password=hashed_password,
            city_id=0,
            blood_group='',
            is_email_verified='False',
            is_phone_verified='False',
            start_donor_year=date_joined.year,
            donor_status=''
        )
        session.add(new_user)
        await session.commit()
        return new_user.id
    except Exception as e:
        logger.error(e)
        await session.rollback()
        return None


async def login_user(session: AsyncSession, dict: dict):
    user = await session.execute(select(User).where(or_(User.email == dict['username'], User.phone == dict['username'])))
    user = user.scalar()
    if user is not None and user.password == hashlib.sha256(dict['password'].encode()).hexdigest():
        return user

    return None


async def update_user(session: AsyncSession, user_id, **kwargs):
    stmt = update(User).where(User.id == user_id).values(**kwargs)
    await session.execute(stmt)
    await session.commit()
