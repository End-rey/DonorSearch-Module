from sqlalchemy import Enum, Integer, String, DateTime, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.database.models import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    
    # id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    # date_joined: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    # username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    # first_name: Mapped[str] = mapped_column(String(255), nullable=False)
    # last_name: Mapped[str] = mapped_column(String(255))
    # middle_name: Mapped[str] = mapped_column(String(255))
    # maiden_name: Mapped[str] = mapped_column(String(255))
    # birth_date: Mapped[DateTime] = mapped_column(DateTime)
    # gender: Mapped[Gender] = mapped_column(Gender)
    # email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    # phone: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    # password: Mapped[str] = mapped_column(String, nullable=False)
    # login_via_phone: Mapped[bool] = mapped_column(Boolean)
    # about: Mapped[str] = mapped_column(String(130))
    # city_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # is_in_top_20: Mapped[bool] = mapped_column(Boolean)
    # is_in_top_100: Mapped[bool] = mapped_column(Boolean)
    # photo: Mapped[str] = mapped_column(String, nullable=False)
    # blood_group: Mapped[str] = mapped_column(String, nullable=False)
    # is_email_verified: Mapped[str] = mapped_column(String, nullable=False)
    # is_phone_verified: Mapped[str] = mapped_column(String, nullable=False)
    # email_reconfirmed_at: Mapped[str] = mapped_column(String)
    # phone_reconfirmed_at: Mapped[str] = mapped_column(String)
    # legacy_avatar: Mapped[str] = mapped_column(String, nullable=False)
    # start_donor_year: Mapped[int] = mapped_column(Integer, nullable=False)
    # referal_code: Mapped[str] = mapped_column(String, nullable=False)
    # parent_user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    # donor_status: Mapped[str] = mapped_column(String, nullable=False)
    # managed_organizations: Mapped[str] = mapped_column(String, nullable=False)
    # joined_events: Mapped[str] = mapped_column(String, nullable=False)
    # joined_organizations: Mapped[str] = mapped_column(String, nullable=False)
    # donor_certificate: Mapped[bool] = mapped_column(Boolean)
    
