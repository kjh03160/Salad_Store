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

Base.metadata.create_all(bind=engine)


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    CORS(app, resources={r'*': {'origins': 'http://127.0.0.1:3000'}}, expose_headers =['*'], supports_credentials = True, credientials = True)
    models.db.init_app(app)
    return app

app = create_app()
api = Api(app)
app.secret_key = "super secret key"

api.add_resource(Order, '/orders')
api.add_resource(Statistic, '/statistics')
api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')
api.add_resource(Link, '/link')

api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
if __name__=='__main__':
    app.run(debug=True)

