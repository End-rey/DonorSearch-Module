from sqlalchemy import Column, Enum, Integer, String, DateTime, Boolean, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from app.database.models import Base

class DonationType(Enum):
    blood: "кровь"
    plasma: "плазма"
    platelets: "тромбоциты"
    erythrocytes: "эритроциты"
    leukocytes: "гранулоциты"

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
