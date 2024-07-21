from logging import getLogger
import json

logger = getLogger('uvicorn')

def getDB():
    with open('./src/db/database.json', 'r') as dbj:
        db = json.load(dbj)
    return db

def saveDB(db):
    with open('./src/db/database.json', 'w') as dbj:
        json.dump(db, fp=dbj, indent=2,ensure_ascii=False)
    
def clearDB(db):
    db["contents"] = []
    db["user"] = []
    db["posts"] = []
    saveDB(db)

def addUserDB(db, user):
    db["user"].append(user)
    db["reviews"] = []
    saveDB(db)

def clearDBReviews(db):
    db["reviews"] = []
    saveDB(db)

def clearDBContent(db):
    db["contents"] = []
    saveDB(db)
