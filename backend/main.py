from flask import Flask
from database import  Base, engine, DB_URL
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from flask_cors import CORS
from werkzeug.utils import secure_filename

import models
from models import db

from API.all import All
from API.category import Category
from API.option import Option
from API.menu import Menu
from API.order import Order
from API.statistic import Statistic
from API.user import Signup, Login
from API.link import Link
from API.soldout import Soldout


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    # CORS configuration
    CORS(app, resources={r'*': {'origins': '*'}}, expose_headers =['*'], supports_credentials = True, credientials = True)
    # Flask=DB 연결
    models.db.init_app(app)
    return app


Base.metadata.create_all(bind=engine)

app = create_app()
api = Api(app)
app.secret_key = "super secret key"

# api 등록
api.add_resource(Order, '/orders')
api.add_resource(Statistic, '/statistics')
api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')
api.add_resource(Link, '/link')
api.add_resource(Soldout,'/soldout')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')


if __name__=='__main__':
    app.run()

