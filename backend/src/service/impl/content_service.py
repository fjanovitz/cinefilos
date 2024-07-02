from src.schemas.content import Content
from src.db.database import getDB, saveDB

def filter_by_content_type(contents: list, content_type: str):
    return [content for content in contents if content["content_type"] == content_type]

class ContentService:
    @staticmethod
    def get_contents(content_type):
        db = getDB()

        contents = filter_by_content_type(db["contents"], content_type)
        
        return contents

    @staticmethod
    def get_content_by_title(content_title: str, content_type: str):
        db = getDB()
        contents = filter_by_content_type(db["contents"], content_type)

        for content in contents:
            if content["title"] == content_title:
                return content
        return None

    @staticmethod
    def get_content_by_id(content_id: str, content_type: str):
        db = getDB()
        contents = filter_by_content_type(db["contents"], content_type)

        for content in contents:
            if content["id"] == content_id:
                return content
        return None

    @staticmethod
    def add_content(content: Content, content_type: str):
        db = getDB()

        content_dict = content.model_dump()
        contents = filter_by_content_type(db["contents"], content_type)

        for _content in contents:
            if content_dict["title"] == _content["title"]:
                return None
            
        db["contents"].append(content_dict)
        saveDB(db)
        return content
    
    @staticmethod
    def update_content(content_title:str, content: Content, content_type: str):
        db = getDB()

        content_dict = content.model_dump()
        found = True
        for i in range(len(db["contents"])):
            if db["contents"][i]["title"] == content_title and db["contents"][i]["content_type"] == content_type:
                found = True
                db["contents"][i] = content_dict
                break

        if not found:
            return None

        saveDB(db)
        return content
    
    @staticmethod
    def delete_content(content_title: str, content_type: str):
        db = getDB()

        found = False
        for i in range(len(db["contents"])):
            if db["contents"][i]["title"] == content_title and db["contents"][i]["content_type"] == content_type:
                found = True
                deleted_content = db["contents"].pop(i)
                break

        if not found:
            return None

        saveDB(db)
        return deleted_content