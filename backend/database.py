# MySQL configuration
db = {
    'user'     : 'root',		# 1
    'password' : 'password',		# 2
    'host'     : 'localhost',	# 3
    'port'     : 3306,			# 4
    'database' : 'mysite',		# 5
    'query': {'charset':'utf8'}

}

DB_URL = f"mysql+pymysql://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# DB 엔진
engine = create_engine(DB_URL, convert_unicode=True, echo=True, connect_args={'charset':'utf8'})
session = scoped_session(sessionmaker(autocommit=False, 
	autoflush=True, bind=engine))

Base = declarative_base()

