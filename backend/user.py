import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, abort, Response, make_response
import flask
from uuid import uuid4
from database import session, Base, engine
import models
from redis_session import *

redis_session = RedisSession()

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
        duplicated_user = models.User.query.filter_by(user_id = arg['usr_id']).first()
        if not duplicated_user:
            user = models.User(user_id=arg['usr_id'], is_super=True)
            user.set_password(arg['password'])
            session.add(user)
            session.commit()
            return 200
        else:
            abort(404)
    def put(self):
        # request.json
        pass
    def delete(self):
        pass


class Login(Resource):
    def get(self, response):
        # print(flask.session['session_key'])
        # if 'session_key' in flask.session:
        #     user = 'logged_in'
        # else:
        #     user = 'null'
        
        parser = reqparse.RequestParser()
        parser.add_argument('key', required=True)

        data = parser.parse_args()
        # data = request.json()['params']['key']
        # res = make_response('coookie')
        # result = redis_session.retrieve_session(data['key']).decode()

        # res.set_cookie('dadfads')

        print(data)
        return Response('', 200, {'Set-Cookie':'mycookie=dd'})

    def post(self):
        arg = request.json
        print(arg)
        user_in_db = models.User.query.filter_by(user_id = arg['usr_id']).first()
        if user_in_db:
            if user_in_db.check_password(arg['password']):
                session_key = redis_session.save_session(arg['usr_id'])
                # print(redis_session.db)
                # print(session_key)
                # flask.session['session_key'] = session_key
                return session_key, 200
            else:
                abort(404)
        abort(404)

# class VerifyUser(Resource):
#     def get(self):
#         if 'session_key' not in session:
#             return 200, { "logged_in" : False }

#         session_key = session['session_key']
#         user_name = redis_session().open_session(session_key)

#         # key 관리 db 에서 세션이 유효하지 않으면 세션 삭제
#         if user_name is None :
#             del session['session_key']

#         return 200, { "logged_in" : True }
