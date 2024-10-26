import os
from dotenv import load_dotenv

# Construct the path to the .env file
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'Database', 'PostgreSQL', '.env')

# Load the environment variables from the .env file
load_dotenv(dotenv_path=env_path)

# Print the environment variables
print('POSTGRES_USER_DEV:', os.getenv('POSTGRES_USER_DEV'))
print('POSTGRES_PASSWORD_DEV:', os.getenv('POSTGRES_PASSWORD_DEV'))
print('POSTGRES_DB:', os.getenv('POSTGRES_DB'))
print('POSTGRES_HOST:', os.getenv('POSTGRES_HOST'))
