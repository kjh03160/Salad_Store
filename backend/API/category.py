from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models


class Category(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('category_name', required = False, help = 'no name')
    parser.add_argument('category_pk', required = False, help = 'show me valid pk')

    def get(self):
        request = Category.parser.parse_args()
        return_list = []
        if request['category_pk'] == None:
            category = session.query(models.Category).all()
            if category == None:
                return Response(status = 404)
            print(1)
            for i in category:
                return_list.append({'categoryPk':i.category_pk, 'categoryName': i.category_name})
        else:
            try:
                category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
                return_list.append({'categoryPk' : category.category_pk, 'categoryName': category.category_name})
            except:
                return Response (status = 404)
        return {'data' : return_list}, 200

    def post(self):
        request = Category.parser.parse_args()
        if request['category_name'] == None:
            return Response(status = 400)
        elif session.query(models.Category).filter(models.Category.category_name == request['category_name']).count() > 0:
            return Response(status = 400)
        category = models.Category(category_name = request['category_name'])
        session.add(category)
        session.flush()
        session.commit()
        return Response(status = 201)

    def patch(self):
        request = Category.parser.parse_args()
        if (request['category_name'] == None) or (request['category_pk'] == None):
            return Response(status = 400)
        category = session.query(models.Category).filter(models.Category.category_pk == request['category_pk']).first()
        category.category_name = request['category_name']
        session.commit()
        return Response(status = 204)

    def delete(self):
        request = Category.parser.parse_args()
        if request['category_pk'] == None:
            return Response(status = 400)
        category = session.query(models.Category).filter(models.Category.category_pk == request['category_pk']).first()
        session.delete(category)
        session.commit()
        return Response(status = 200)      