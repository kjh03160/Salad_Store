from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine, DB_URL
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from models import db
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from all import All
from category import Category
from option import Option
from menu import Menu
from order import Order
from statistic import Statistic

Base.metadata.create_all(bind=engine)


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    models.db.init_app(app)
    CORS(app, resources={r'*': {'origins': '*'}})

    return app

app = create_app()
api = Api(app)
app.secret_key = "super secret key"


@app.route("/")  # 라우팅 설정
def main():
    return "Welcome"
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')

api.add_resource(Order, '/orders')
api.add_resource(Statistic, '/statistics')
api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')

if __name__=='__main__':
    app.run(debug=True)

