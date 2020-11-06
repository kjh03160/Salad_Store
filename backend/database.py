# config.py

# flask-sqlacodegen "mysql://root:password@localhost:3306/mysite" --flask > models.py


# https://beomi.github.io/2017/10/20/DB-To-SQLAlchemy-Model/
# https://velog.io/@inyong_pang/Flask-API-MySQL-%EC%97%B0%EB%8F%99-SQLAlchemy
# http://blog.naver.com/PostView.nhn?blogId=sukjun40&logNo=221155152471
# https://edykim.com/ko/post/getting-started-with-sqlalchemy-part-1/
# https://flask-docs-kr.readthedocs.io/ko/latest/patterns/sqlalchemy.html

db = {
    'user'     : 'root',		# 1
    'password' : '1234',		# 2
    'host'     : 'localhost',	# 3
    'port'     : 3306,			# 4
    'database' : 'mysite'		# 5
}

DB_URL = f"mysql+pymysql://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine(DB_URL, convert_unicode=True, echo=True)
session = scoped_session(sessionmaker(autocommit=False, 
	autoflush=False, bind=engine))

Base = declarative_base()

