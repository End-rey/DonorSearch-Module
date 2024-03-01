from datetime import datetime
from sqlalchemy import desc, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.bloodcentre.Bloodcentre import BloodCentre, Country, City, Region
from app.logger import get_logger
logger = get_logger()


async def create_blood_centre(session: AsyncSession, dict: dict):
    new_centre = BloodCentre(
        name=dict['name'],
        address=dict['address'],
        city_id=dict['city_id'],
        is_no_registration=dict['is_no_registration'],
        is_typing=dict['is_typing'],
        is_work_on_sat=dict['is_work_on_sat'],
        is_work_on_sun=dict['is_work_on_sun'],
        schedule=dict['schedule'],
        phone_numbers=dict['phone_numbers'],
        is_closed=dict['is_closed']
    )
    session.add(new_centre)
    await session.commit()


async def get_blood_centre_by_id(session: AsyncSession, centre_id: int):
    stmt = select(BloodCentre).filter(BloodCentre.id == centre_id)
    result = await session.execute(stmt)
    return result.scalars().first()


async def get_blood_centres_by_city(session: AsyncSession, city_id: int):
    stmt = select(BloodCentre).filter(BloodCentre.city_id == city_id)
    result = await session.execute(stmt)
    return result.scalars().all()


async def update_blood_centre(session: AsyncSession, centre_id: int, **kwargs):
    stmt = select(BloodCentre).filter(BloodCentre.id == centre_id)
    result = await session.execute(stmt)
    centre = result.scalars().first()
    if centre:
        for attr, value in kwargs.items():
            setattr(centre, attr, value)
        await session.commit()
    else:
        raise ValueError("Blood Centre not found")


async def delete_blood_centre(session: AsyncSession, centre_id: int):
    stmt = select(BloodCentre).filter(BloodCentre.id == centre_id)
    result = await session.execute(stmt)
    centre = result.scalars().first()
    if centre:
        session.delete(centre)
        await session.commit()
    else:
        raise ValueError("Blood Centre not found")


async def get_city_by_name(session: AsyncSession, city_name: str):
    stmt = select(City).filter(func.lower(City.name) == city_name.lower())
    result = await session.execute(stmt)
    return result.scalars().first()


async def get_city_by_coordinates(session: AsyncSession, latitude: float, longitude: float):
    stmt = select(
        City,
        func.sqrt(
            func.pow(func.radians(latitude) - func.radians(City.latitude), 2) +
            func.pow(func.radians(longitude) - func.radians(City.longitude), 2)
        ).label("distance")
    ).order_by(desc("distance"))
    result = await session.execute(stmt)
    nearest_city = result.scalars().first()
    return nearest_city


async def get_all_cities(session: AsyncSession):
    stmt = select(City)
    result = await session.execute(stmt)
    return result.scalars().all()
