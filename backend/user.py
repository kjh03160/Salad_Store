import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request
from database import session, Base, engine
import models

class Signup(Resource):

    def get(self):
        # parser = reqparse.RequestParser()
        # parser.add_argument('usr_id', type = str, required = True)
        # parser.add_argument('password', type = str, required = True)
        # arg = parser.parse_args()
        pass
        # return 200 ,{'id':user.user_id, "password":user.password, "is_super":user.is_super }
    def post(self):
        arg = request.json
        print(arg)
        user = models.User(user_id=arg['usr_id'], is_super=True)
        user.set_password(arg['password'])
        session.add(user)
        session.commit()
        return 200
    def put(self):
        # request.json
        pass
    def delete(self):
        pass

