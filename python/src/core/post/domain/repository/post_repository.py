from abc import ABC, abstractmethod
import uuid
from ..entity.post import Post
from typing import List


class PostRepository(ABC):
    @abstractmethod
    def getPostById(self, id: uuid.UUID) -> Post:
        pass

    @abstractmethod
    def getPosts(self) -> List[Post]:
        pass
