from logging import getLogger
import json

logger = getLogger('uvicorn')

def getDB():
    with open('./src/db/database.json', 'r') as dbj:
        db = json.load(dbj)
    return db

def saveDB(db):
    with open('./src/db/database.json', 'w') as dbj:
        json.dump(db, fp=dbj, indent=4)
    
def clearDB(db):
    db["movies"] = []
    db["tv_shows"] = []
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
    db["movies"] = []
    db["tv_shows"] = []
    saveDB(db)
