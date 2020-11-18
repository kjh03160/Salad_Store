from flask import Flask, request, jsonify
from database import session, Base, engine, DB_URL
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from flask_cors import CORS
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

api.add_resource(Order, '/orders')
api.add_resource(Statistic, '/statistics')

if __name__=='__main__':
    
    app.run(debug=True)