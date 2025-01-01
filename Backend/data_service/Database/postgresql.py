import psycopg2
import os
current_file_path = os.path.abspath(__file__)


class Postgresql:
    def __init__(self):
        self.connection_params={
            'dbname': os.getenv('POSTGRESQL_DB'),
            'user': os.getenv('POSTGRESQL_USER'),
            'password': os.getenv('POSTGRESQL_PASSWORD'),
            'host': os.getenv('POSTGRESQL_HOST'),
            'port': os.getenv('POSTGRESQL_PORT')
        }
        self.connection = psycopg2.connect(**self.connection_params)
        self.cursor = self.connection.cursor()

    def execute(self, query, fetch='one'):
        try:
            self.cursor.execute(query)
            if fetch == 'one':
                return self.cursor.fetchone()
            elif fetch == 'all':
                return self.cursor.fetchall()
            else:
                return self.cursor
        except Exception as e:
            print(current_file_path, e)
            return None
            
    def commit(self):
        self.connection.commit()

    def close(self):
        self.cursor.close()
        self.connection.close()