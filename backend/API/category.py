from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models

#category와 관련된 작업 수행
class Category(Resource):
    #request 해당 키 값으로 파싱 작업 수행
    parser = reqparse.RequestParser()
    parser.add_argument('category_name', required = False, help = 'no name')
    parser.add_argument('category_pk', required = False, help = 'show me valid pk')
    
    #categories database에 접근하기 위한 함수
    #pk 값이 없으면 categories 튜플 전체 반환, pk 값이 존재하면 해당 pk 값을 갖고 있는 튜플 반환
    def get(self):
        request = Category.parser.parse_args()
        return_list = []
        if request['category_pk'] == None:
            category = session.query(models.Category).all()
            if category == None:
                # 데이터가 존재하지 않기 때문에 404 반환
                return Response(status = 404)
            # 데이터베이스 객체 딕셔너리로 파싱 작업
            for i in category:
                return_list.append({'categoryPk':i.category_pk, 'categoryName': i.category_name})
        else:
            try:
                category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
                # 데이터베이스 객체 딕셔너리로 파싱 작업
                return_list.append({'categoryPk' : category.category_pk, 'categoryName': category.category_name})
            except:
                #filter함수에 반환 값이 없으면 오류 발생으로 404 반환
                return Response (status = 404)
        session.close()
        return {'data' : return_list}, 200

    #categories database에 추가하기 위한 함수
    def post(self):
        request = Category.parser.parse_args()
        #post에 필요한 값인 'category_name'이 없으면 400 반환
        if request['category_name'] == None:
            return Response(status = 400)
        #똑같은 이름이 데이터베이스에 존재하면 400 반환
        try:
            session.query(models.Category).filter(models.Category.category_name == request['category_name']).count() > 0:
            return Response(status = 400)
        except:
            category = models.Category(category_name = request['category_name'])
            session.add(category)
            session.commit()
            session.close()
            return Response(status = 201)

        


    #categories database에 있는 튜플을 수정하기 위한 함수
    def patch(self):
        request = Category.parser.parse_args()
        #patch에 필요한 값인 catogry name과 category pk가 없으면 400 반환
        if (request['category_name'] == None) or (request['category_pk'] == None):
            return Response(status = 400)

        category = session.query(models.Category).filter(models.Category.category_pk == request['category_pk']).first()
        category.category_name = request['category_name']
        session.commit()
        session.close()
        return Response(status = 204)

    #categories database에 있는 튜플을 삭제하기 위한 함수
    def delete(self):
        request = Category.parser.parse_args()
        #delete에 필요한 값인 category pk가 없으면 400 반환
        if request['category_pk'] == None:
            return Response(status = 400)
        sql = f"delete from categories where category_pk = {request['category_pk']}"

        session.execute(sql)
        session.commit()
        session.close()
        return Response(status = 200)      