from enum import Enum
from sqlalchemy import Column, Enum as PgEnum, Integer, String, DateTime, Boolean, func, ForeignKey, Date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.database.models import Base

class DonationType(Enum):
    blood = "blood"
    plasma = "plasma"
    trombs = "trombs"
    erits = "erits"
    granuls = "granuls"

class Donation(Base):
    __tablename__ = "donation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    donation_type_id: Mapped[DonationType] = mapped_column(PgEnum(DonationType, name="donation_type"), nullable=False)
    is_commerce: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_confirmed: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_in_stationary_point: Mapped[bool] = mapped_column(Boolean, nullable=False)
    blood_centre_id: Mapped[int] = mapped_column(Integer, nullable=False)
    
    user = relationship("User", back_populates="donations")
