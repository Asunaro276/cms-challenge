from python.src.core.post.domain.repository.post_repository \
    import PostRepository
from .interface import GetPostUseCase


class GetPostUseCaseImpl(GetPostUseCase):
    def __init__(self, post_repository: PostRepository) -> None:
        super().__init__(post_repository)

    def execute(self):
        return self.post_repository.getPosts()
