import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, Response, make_response
from flask import session as f_session
from database import session, Base, engine
import models
from redis_session import *

redis_session = RedisSession()

class Signup(Resource):

    def get(self):
        return Response(status = 405)
    def post(self):
        arg = request.json
        duplicated_user = models.User.query.filter_by(user_id = arg['usr_id']).first()
        if not duplicated_user:
            user = models.User(user_id=arg['usr_id'], is_super=True)
            user.set_password(arg['password'])
            session.add(user)
            session.commit()
            return 201
        else:
            return Response(status = 409)

    def put(self):
        # request.json
        return Response(status = 405)
    def delete(self):
        return Response(status = 405)


class Login(Resource):
    def get(self):
        if 'usr' in f_session:
            print('hhhh')
        else:
            print('ddddd')
        print(f_session)
        return Response('', 200)

    def post(self):
        arg = request.json
        user_in_db = models.User.query.filter_by(user_id = arg['usr_id']).first()
        if user_in_db:
            if user_in_db.check_password(arg['password']):
                session_key = redis_session.save_session(arg['usr_id'])
                # f_session.permanent = True
                f_session['usr'] = session_key
                print(f_session)
                # print(redis_session.db)
                cookie = 'user=' + session_key
                resp = Response('', 200, {'Set-Cookie': cookie})
                # resp.headers['Access-Control-Allow-Credentials'] = 'true'
                resp.headers.add('Access-Control-Allow-Headers',
                         "Origin, X-Requested-With, Content-Type, Accept, x-auth")
                return resp
            else:
                return Response(status = 401)
        return Response(status = 401)

class Test(Resource):
    def post(self):
        if 'usr' in f_session:
            print('hhhh')
        else:
            print('ddddd')
        return 200