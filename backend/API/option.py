from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models




class Option(Resource):
    #request 해당 키 값으로 파싱 작업 수행
    parser = reqparse.RequestParser()
    parser.add_argument('option_pk', required = False, help ='')
    parser.add_argument('option_name', required = False, help = '')
    parser.add_argument('option_price', required = False, help = '')
    parser.add_argument('option_soldout', required = False, help = '')
    parser.add_argument('menu_pk', required = False, help ='')

    #options database에 접근하기 위한 함수
    #pk 값이 없으면 options 튜플 전체 반환, pk 값이 존재하면 해당 pk 값을 갖고 있는 튜플 반환
    def get(self):
        request = Option.parser.parse_args()
        return_list = []
        if request['pk'] == None:
            option = session.query(models.Option).all()
            session.close()
            # 데이터가 존재하지 않기 때문에 404 반환
            if option == None:
                return Response(status = 404)
            # 데이터베이스 객체 딕셔너리로 파싱 작업
            for i in option:
                return_list.append({
                'optionPK' : i.option_pk,
                'optionName' : i.option_name,
                'optionPrice' : i.option_price,
                'optionSoldout' : i.option_soldout})
        else:
            try:
                option = session.query(models.Option).filter(models.Option.option_pk == request['pk']).first()
                session.close()
                # 데이터베이스 객체 딕셔너리로 파싱 작업
                return_list.append({
                'optionPK' : option.option_pk,
                'optionName': option.option_name,
                'optionPrice' : option.option_price,
                'optionSoldout' : option.option_soldout
                })
            except:
                # 해당 pk값을 가진 데이터가 존재하지 않기 때문에 404 반환
                return Response (status = 404)
        return {'data' : return_list}, 200

    #options database에 추가하기 위한 함수
    def post(self):
        request = Option.parser.parse_args()
        print(request)
         #post에 필요한 값인 'option_name', 'option_price', 'option_soldout'이 없으면 400 반환
        if request['option_name'] and request['option_price'] == None:
            return Response(status = 400)

        option_menu = models.Option()
        option_menu.option_name = request['option_name']
        option_menu.option_price = request['option_price']
        option_menu.option_soldout = 0
        session.add(option_menu)
        session.commit()

        return Response(status = 201)
    
    #options database에 있는 튜플을 수정하기 위한 함수
    def patch(self):
        request = Option.parser.parse_args()

        #post에 필요한 값인 'option_pk' 가 없으면 400 반환
        if request['option_pk'] == None:
            return Response(status = 400)
        
        option = session.query(models.Option).get(request['option_pk'])

        if request['option_name'] != None:
            option.option_name = request['option_name']
        if request['option_price'] != None:
            option.option_price = request['option_price']
        if request['option_soldout'] != None:
            option.option_soldout = request['option_soldout']
        
        session.commit()
        session.close()
        return Response(status = 204)

    #options database에 있는 튜플을 삭제하기 위한 함수
    def delete(self):
        request = Option.parser.parse_args()

        #post에 필요한 값인 'option_pk' 가 없으면 400 반환
        if request['option_pk'] == None:
            return Response(status = 400)

        session.execute("DELETE FROM OPTIONS WHERE option_pk = {}".format(request['option_pk']))
        session.commit()
        session.close()
        return Response(status = 200)