import json
from fastapi import APIRouter, Response
from sqlalchemy import create_engine, text
from .datastore.mysql import DB_CONFIG

router = APIRouter()

user = DB_CONFIG['db_user']
password = DB_CONFIG['db_password']
host = DB_CONFIG['db_host']
db_name = DB_CONFIG['db_database']

engine = create_engine(f"mysql+mysqlconnector://{user}:{password}@{host}/{db_name}")

@router.get("/posts")
def read_post():
    result = []
    with engine.connect() as conn:
        rows = conn.execute(text("select id, title, body from contents"))
        for id, title, body in rows:
            result.append({'id': id, 'title': title, 'body': body})
    return {'posts': result}


@router.get("/posts/{item_id}")
def read_item(item_id: int, q: str = ""):
    return {"item_id": item_id, "q": q}
