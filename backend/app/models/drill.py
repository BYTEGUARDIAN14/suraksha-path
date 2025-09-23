from datetime import datetime
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB
from ..extensions import db


class Drill(db.Model):
    __tablename__ = "drills"

    id: Mapped[int] = mapped_column(primary_key=True)
    disaster_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    steps: Mapped[dict] = mapped_column(JSONB, nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    steps_hi: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

