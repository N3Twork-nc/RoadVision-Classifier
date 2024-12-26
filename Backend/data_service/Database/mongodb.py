from pymongo import MongoClient


class MongoDB:
    def __init__(self):
        self.host = os.getenv('MONGODB_HOST')
        self.port = os.getenv('MONGODB_PORT')
        self.username = os.getenv('MONGODB_USER')
        self.password = os.getenv('MONGODB_PASSWORD')
        self.db_name = os.getenv('MONGODB_DB')
        self.uri = f"mongodb://{self.username}:{self.password}@{self.host}:{self.port}/{self.db_name}"
        self.client = MongoClient(uri)