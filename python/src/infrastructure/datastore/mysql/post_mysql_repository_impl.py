from typing import List
from sqlalchemy import text

from src.core.post.domain.entity.post import Post
from src.core.post.domain.repository.post_repository import PostRepository
from src.infrastructure.datastore.mysql.config import engine


class MysqlPostRepository(PostRepository):
    def getPosts(self) -> List[Post]:
        with engine.connect() as conn:
            rows = conn.execute(text("select id, title, body from contents"))
            result = [dict(row) for row in rows]
        return Post.from_dict(result)
