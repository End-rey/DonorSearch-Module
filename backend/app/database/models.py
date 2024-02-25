from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    created: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), nullable=True)
    updated: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now(),  nullable=True)