from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models

class Link(Resource):
    #request 해당 키 값으로 파싱 작업 수행
    parser = reqparse.RequestParser()
    parser.add_argument('menu_pk', required = False, help = '')
    parser.add_argument('option_pk', required = False, help = '')

    #메뉴 옵션 관계 생성을 위한 함수
    def post(self):
        request = Link.parser.parse_args()

        #post에 필요한 값인 'option_pk', 'menu_pk'가 없으면 400 반환
        if (request['option_pk'] and request['menu_pk']) == None:
            return Response(status = 400)

        #menus 데이터베이스에 해당 pk를 가진 값이 없으면 400 반환
        main_menu = session.query(models.Menu).filter_by(menu_pk = request["menu_pk"]).first()
        if main_menu == None:
            return Response(status = 400)

        try:
            option_menu = session.query(models.Option).get(request['option_pk'])
            main_menu.options.append(option_menu)
            session.commit()
            
            return Response(status = 201)
        except:
            return Response(status = 400)
        finally:
            session.close()

    #메뉴 옵션 관계 해제를 위한 함수
    def delete(self):
        request = Link.parser.parse_args()

        #post에 필요한 값인 'option_pk', 'menu_pk'가 없으면 400 반환
        if (request['option_pk'] and request['menu_pk']) == None:
            return Response(status = 400)

        main_menu = session.query(models.Menu).filter_by(menu_pk = request["menu_pk"]).first()
        if main_menu == None:
            return Response(status = 400)

        try:
            option_menu = session.query(models.Option).get(request['option_pk'])
            main_menu.options.remove(option_menu)
            session.commit()

            return Response(status = 201)

        except:
            return Response(status = 400)