from enum import Enum
from sqlalchemy import Enum as PgEnum, Integer, String, DateTime, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.database.models import Base
from sqlalchemy.orm import relationship

class Gender(Enum):
    male = "мужчина"
    female = "женщина"

class User(Base):
    __tablename__ = "users"

    date_joined: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String(255), nullable=True)
    middle_name: Mapped[str] = mapped_column(String(255), nullable=True)
    maiden_name: Mapped[str] = mapped_column(String(255), nullable=True)
    birth_date: Mapped[DateTime] = mapped_column(DateTime, nullable=True)
    gender: Mapped[Gender] = mapped_column(PgEnum(Gender, name="gender"), nullable=True)
    login_via_phone: Mapped[bool] = mapped_column(Boolean, nullable=True)
    about: Mapped[str] = mapped_column(String(130), nullable=True)
    city_id: Mapped[int] = mapped_column(Integer, nullable=False)
    is_in_top_20: Mapped[bool] = mapped_column(Boolean, nullable=True)
    is_in_top_100: Mapped[bool] = mapped_column(Boolean, nullable=True)
    photo: Mapped[str] = mapped_column(String, nullable=True)
    blood_group: Mapped[str] = mapped_column(String, nullable=False)
    is_email_verified: Mapped[str] = mapped_column(String, nullable=False)
    is_phone_verified: Mapped[str] = mapped_column(String, nullable=False)
    email_reconfirmed_at: Mapped[str] = mapped_column(String, nullable=True)
    phone_reconfirmed_at: Mapped[str] = mapped_column(String, nullable=True)
    legacy_avatar: Mapped[str] = mapped_column(String, nullable=True)
    start_donor_year: Mapped[int] = mapped_column(Integer, nullable=False)
    referal_code: Mapped[str] = mapped_column(String, nullable=True)
    parent_user_id: Mapped[int] = mapped_column(Integer, nullable=True)
    donor_status: Mapped[str] = mapped_column(String, nullable=False)
    managed_organizations: Mapped[str] = mapped_column(String, nullable=True)
    joined_events: Mapped[str] = mapped_column(String, nullable=True)
    joined_organizations: Mapped[str] = mapped_column(String, nullable=True)
    donor_certificate: Mapped[bool] = mapped_column(Boolean, nullable=True)
    
    donations = relationship("Donation", back_populates="user")
    
