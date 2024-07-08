from dataclasses import dataclass, asdict
from datetime import datetime
import uuid


@dataclass
class Post:
    id: uuid.UUID
    title: str
    body: str
    created_at: datetime
    update_at: datetime

    @classmethod
    def from_dict(cls, data):
        return cls(**data)

    def to_dict(self):
        return asdict(self)
