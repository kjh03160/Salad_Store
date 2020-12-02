from flask import Flask
from database import  Base, engine, DB_URL
from flask_restful import Resource, Api
import models
from models import db
from flask_cors import CORS
from user import *
from werkzeug.utils import secure_filename
from all import All
from category import Category
from option import Option
from menu import Menu
from link import Link
from API.all import All
from API.category import Category
from API.option import Option
from API.menu import Menu
from API.order import Order
from API.statistic import Statistic

Base.metadata.create_all(bind=engine)


def create_app():
    app = Flask(__name__)
    db = {
        'user'     : 'root',		# 1
        'password' : '1234',		# 2
        'host'     : 'localhost',	# 3
        'port'     : 3306,			# 4
        'database' : 'mysite'		# 5
        }
    DB_URL = f"mysql+pymysql://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    CORS(app, resources={r'*': {'origins': 'http://127.0.0.1:3000'}}, expose_headers =['*'], supports_credentials = True, credientials = True)
    models.db.init_app(app)

    return app

app = create_app()
api = Api(app)
app.secret_key = "super secret key"

with app.app_context():
    db.create_all()


class Index(Resource):
    def get(self):
        user = models.Category(category_name="123333")  
        session.add(user)
        session.flush()
        print(user.category_pk)
        # print(session.new)
        # print(session.query(models.Category).get())
        menu = models.Menu(category_pk=user.category_pk, menu_name = 'gd')
        
        session.add(menu)
        print()
        session.flush()
        # session.commit()
        return {'result':user.category_pk, "2":menu.menu_pk}
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass


api.add_resource(Index, '/menu')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Order, '/orders')
api.add_resource(Statistic, '/statistics')
api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')
api.add_resource(Link, '/link')

if __name__=='__main__':
    app.run(debug=True)

