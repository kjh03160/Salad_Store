import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request, abort, session
from module.redis_session import redis_session
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
    def get(self):
        if 'session_key' in session:
            del session['session_key']
            return 200
        else:
            abort(404)

    def post(self):
        arg = request.json
        user_in_db = models.User.query.filter_by(user_id = arg['usr_id']).first()
        if user_in_db:
            if user_in_db.check_password(arg['password']):
                session_key = redis_session().save_session(user_name)
                 session['session_key'] = session_key
                return 200
            else:
                abort(404)
        abort(404)

class VerifyUser(Resource):
    def get(self):
        if 'session_key' not in session:
            return 200, { "logged_in" : False }

        session_key = session['session_key']
        user_name = redis_session().open_session(session_key)

        # key 관리 db 에서 세션이 유효하지 않으면 세션 삭제
        if user_name is None :
            del session['session_key']

        return 200, { "logged_in" : True }

class RedisSession(Resource):
    prefix = 'was:session_key:' # Redis key 앞에 넣을 값
    server_ip = 'localhost' # Redis ip 
    port = 6379
    timeout = 3600

    def __init__(self):
        self.db = Redis(self.server_ip, self.port)

    # 세션이 있으면 타임아웃 만큼 다시 연장해주고 없으면 False 있으면 사용자id 리턴
    def open_session(self, session_key):
        user_name = self.db.get(self.prefix+session_key)

        if user_name is not None:
            self.db.expire(self.prefix+session_key, self.timeout)

        return user_name

    # 신규 세션 요청 시 세션 값을 만들어서 리턴
    def save_session(self, user_name):
        session_key = str(uuid4())
        self.db.setex(self.prefix+session_key, user_name, self.timeout)

        return session_key