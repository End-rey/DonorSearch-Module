from sqlalchemy import Float, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.models import Base

class City(Base):
    __tablename__ = "city"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    region_id: Mapped[int] = mapped_column(Integer, ForeignKey("region.id"), nullable=False)
    
    region = relationship("Region", back_populates="cities")
    bloodcentres = relationship("BloodCentre", back_populates="city")

class Region(Base):
    __tablename__ = "region"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    country_id: Mapped[int] = mapped_column(Integer, ForeignKey("country.id"), nullable=False)
    
    cities = relationship("City", back_populates="region")
    country = relationship("Country", back_populates="regions")

class Country(Base):
    __tablename__ = "country"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    
    regions = relationship("Region", back_populates="country")

class BloodCentre(Base):
    __tablename__ = "bloodcentre"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    city_id: Mapped[int] = mapped_column(Integer, ForeignKey("city.id"), nullable=False)
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

    city = relationship("City", back_populates="bloodcentres")

