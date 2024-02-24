from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from enum import Enum

class Gender(Enum):
    male: "мужской"
    female: "женский"

class DonationType(Enum):
    blood: "кровь"
    plasma: "плазма"
    platelets: "тромбоциты"
    erythrocytes: "эритроциты"
    leukocytes: "гранулоциты"

class Base(DeclarativeBase):
    created: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    updated: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date_joined: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(255))
    middle_name: Mapped[str] = mapped_column(String(255))
    maiden_name: Mapped[str] = mapped_column(String(255))
    birth_date: Mapped[DateTime] = mapped_column(DateTime)
    gender: Mapped[Gender] = mapped_column(Gender)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    login_via_phone: Mapped[bool] = mapped_column(Boolean)
    about: Mapped[str] = mapped_column(String(130))
    city_id: Mapped[int] = mapped_column(Integer, nullable=False)
    is_in_top_20: Mapped[bool] = mapped_column(Boolean)
    is_in_top_100: Mapped[bool] = mapped_column(Boolean)
    photo: Mapped[str] = mapped_column(String, nullable=False)
    blood_group: Mapped[str] = mapped_column(String, nullable=False)
    is_email_verified: Mapped[str] = mapped_column(String, nullable=False)
    is_phone_verified: Mapped[str] = mapped_column(String, nullable=False)
    email_reconfirmed_at: Mapped[str] = mapped_column(String)
    phone_reconfirmed_at: Mapped[str] = mapped_column(String)
    legacy_avatar: Mapped[str] = mapped_column(String, nullable=False)
    start_donor_year: Mapped[int] = mapped_column(Integer, nullable=False)
    referal_code: Mapped[str] = mapped_column(String, nullable=False)
    parent_user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    donor_status: Mapped[str] = mapped_column(String, nullable=False)
    managed_organizations: Mapped[str] = mapped_column(String, nullable=False)
    joined_events: Mapped[str] = mapped_column(String, nullable=False)
    joined_organizations: Mapped[str] = mapped_column(String, nullable=False)
    donor_certificate: Mapped[bool] = mapped_column(Boolean)

class Donation(Base):
    __tablename__ = "donation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    donation_type_id: Mapped[DonationType] = mapped_column(DonationType, nullable=False)
    is_commerce: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_confirmed: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_in_stationary_point: Mapped[bool] = mapped_column(Boolean, nullable=False)
    blood_centre_id: Mapped[int] = mapped_column(Integer, nullable=False)

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