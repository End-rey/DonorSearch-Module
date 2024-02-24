from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from app.database.models import Base

class City(Base):
    __tablename__ = "city"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    region_id: Mapped[int] = mapped_column(Integer, nullable=False)

class Region(Base):
    __tablename__ = "region"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    country_id: Mapped[int] = mapped_column(Integer, nullable=False)

class Country(Base):
    __tablename__ = "country"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)

class BloodCentre(Base):
    __tablename__ = "bloodcentre"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    city_id: Mapped[int] = mapped_column(Integer, nullable=False)
    is_no_registration: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_typing: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_work_on_sat: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_work_on_sun: Mapped[bool] = mapped_column(Boolean, nullable=False)
    schedule: Mapped[str] = mapped_column(String, nullable=False)
    phone_numbers: Mapped[str] = mapped_column(String, nullable=False)
    is_closed: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_0pos: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_0neg: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_Apos: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_Aneg: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_Bpos: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_Bneg: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_ABpos: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_need_ABneg: Mapped[bool] = mapped_column(Boolean, nullable=False)