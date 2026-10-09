from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import CheckConstraint, ForeignKey, Text

from app.utils.time import UTCDateTime, utc_now
from app.db import Base


class ChatMessage(Base):
    """Using Session a chat message is sent """

    __tablename__ = "chat_messages"
    __table_args__ = (
        CheckConstraint("length(body) BETWEEN 1 AND 2000", name="ck_chat_messages_body_length"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    participant_id: Mapped[int] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE")
    )
    body: Mapped[str] = mapped_column(Text)
    sent_at: Mapped[datetime] = mapped_column(UTCDateTime, default=utc_now)
