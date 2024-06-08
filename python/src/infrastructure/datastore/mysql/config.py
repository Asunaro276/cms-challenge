from dotenv import load_dotenv
import os
load_dotenv()


DB_CONFIG = {
    'db_user': os.getenv('DB_USER'),
    'db_password': os.getenv('DB_PASSWORD'),
    'db_host': os.getenv('DB_HOST'),
    'db_database': os.getenv('DB')
}
