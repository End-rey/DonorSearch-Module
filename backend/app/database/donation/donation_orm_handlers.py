from datetime import datetime
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.donation.Donation import Donation, DonationType
from app.logger import get_logger
logger = get_logger()


async def get_all_donations(session: AsyncSession):
    return await session.execute(select(Donation))


async def get_donation_by_id(session: AsyncSession, donation_id: int):
    result = await session.execute(select(Donation).filter(Donation.id == donation_id))
    donation = result.scalars().first()
    return donation


async def get_donations_by_user_id(session: AsyncSession, user_id: int) -> list[Donation]:
    result = await session.execute(select(Donation).filter(Donation.user_id == user_id))
    donation = result.scalars().all()
    return donation


async def add_donation(session: AsyncSession, dict: dict):
    try:
        date = datetime.strptime(dict['donationData'], '%Y-%m-%dT%H:%M:%S.%fZ').date()
        new_donation = Donation(
            date = date,
            user_id = dict['user_id'],
            donation_type_id = DonationType(dict['donationType']),
            is_commerce = dict['donationPrice'] == 'money',
            is_confirmed = dict['donationCertificateDate'] == 'today',
            is_in_stationary_point = dict['donationPlace'] == 'station',
            blood_centre_id = 0
        )
        session.add(new_donation)
        await session.commit()
        return new_donation.id
    except Exception as e:
        logger.error(e)
        await session.rollback()
        return None


async def update_Donation(session: AsyncSession, donation_id, **kwargs):
    stmt = update(Donation).where(Donation.id == donation_id).values(**kwargs)
    await session.execute(stmt)
    await session.commit()