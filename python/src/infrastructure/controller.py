from fastapi import APIRouter
from injector import Inject, Injector

from src.core.post.usecase.getpost.interface import GetPostUseCase
router = APIRouter()
injector = Injector()


@router.get("/posts")
def read_post():
    
    return GetPostUseCase()


# @router.get("/posts/{item_id}")
# def read_post_by_id(item_id: int, q: str = ""):
#     with engine.connect() as conn:
#         rows = conn.execute(
#             text(f"select id, title, body from contents where ${item_id}")
#         ).first()
#     return rows._asdict if rows is not None else {}
