from src.schemas.content import Movie, TvShow, Category
from src.db.database import getDB, saveDB

class WatchListService:
    @staticmethod
    def add_to_category_list(username: str, category_id: str, content_id: str, content_type: str):
        db = getDB()

        for content in db[content_type]:
            if content["id"] == content_id:
                db["user"][username][category_id].append(content)
                saveDB(db)
                return content

        return None

    @staticmethod
    def get_category_list(username: str, category_id: str):
        db = getDB()

        return db["user"][username][category_id]
    
    @staticmethod
    def delete_of_category_list(username: str, category_id: str, content_id: str, content_type: str):
        db = getDB()

        for i in range(len(db[username][category_id])):
            if db["user"][username][category_id][i]["id"] == content_id:
                deleted_content = db["user"][username][category_id].pop(i)
                saveDB(db)
                return deleted_content
                break

        return None

