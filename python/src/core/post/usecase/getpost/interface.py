from abc import ABC, abstractmethod
from typing import List

from src.core.post.domain.repository.post_repository import PostRepository
from src.core.post.domain.entity.post import Post 


class GetPostUseCase(ABC):
    def __init__(
        self,
        post_repository: PostRepository
    ) -> None:
        self.post_repository = post_repository

    @abstractmethod
    def execute(self) -> List[Post]:
        pass
