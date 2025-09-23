from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from ..extensions import db


class EmergencyContact(db.Model):
    __tablename__ = "emergency_contacts"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    phone: Mapped[str] = mapped_column(String(50), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)  # police|fire|ambulance|ndma|campus
    region: Mapped[str] = mapped_column(String(120), nullable=True)  # e.g., state code or city

