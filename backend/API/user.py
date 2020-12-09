import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, Response, make_response
from flask import session as f_session
from database import session, Base, engine
import models
from uuid import uuid4
from API.method import snake_to_camel

class Signup(Resource):

    # 로그아웃
    def get(self):
        if 'usr' in f_session:
            f_session.pop('usr')
            return 200
        else:
            return Response(status = 404)
    # 회원 가입
    def post(self):
        arg = request.json
        duplicated_user = models.User.query.filter_by(user_id = arg['usrId']).first()
        # 같은 id의 유저가 DB에 있는지 확인
        if not duplicated_user:
            user = models.User(user_id=arg['usrId'], is_super=arg['isStaff'])
            user.set_password(arg['password'])
            session.add(user)
            session.commit()
            return 201
        else:
            return Response(status = 409)


class Login(Resource):
    # 로그인 상태 확인
    def get(self):
        # 세션이 있는지 확인
        if 'usr' in f_session:
            if 'authority' in f_session:
                authority = f_session['authority']
                return {'authority' : authority}, 200
        else:
            return Response('', 401)

    # 로그인
    def post(self):
        arg = request.json
        user_in_db = models.User.query.filter_by(user_id = arg['usrId']).first()
        # 아이디 확인
        if user_in_db:
            # 비밀번호 확인
            if user_in_db.check_password(arg['password']):
                session_key = str(uuid4())
                f_session.permanent = False
                # 세션 생성
                f_session['usr'] = session_key
                if arg['usrId'] == 'admin':
                    f_session['authority'] = 'admin'
                if arg['usrId'] == 'staff':
                    f_session['authority'] = 'staff'
                if arg['usrId'] == 'user':
                    f_session['authority'] = 'user'
                resp = Response(f_session['authority'], 200)
                resp.headers.add('Access-Control-Allow-Headers',
                         "Origin, X-Requested-With, Content-Type, Accept, x-auth")
                return resp
            else:
                return Response(status = 401)
        return Response(status = 401)
