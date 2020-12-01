from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from API.method import *




class Option(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('option_pk', required = False, help ='')
    parser.add_argument('option_name', required = False, help = '')
    parser.add_argument('option_price', required = False, help = '')
    parser.add_argument('option_soldout', required = False, help = '')
    parser.add_argument('menu_pk', required = False, help ='')

    def get(self):
        request = Option.parser.parse_args()
        return_list = []
        if request['pk'] == None:
            option = session.query(models.Option).all()
            if option == None:
                return Response(status = 404)
            for i in option:
                return_list.append({
                'optionPK' : i.option_pk,
                'optionName' : i.option_name,
                'optionPrice' : i.option_price,
                'optionSoldout' : i.option_soldout})
        else:
            try:
                option = session.query(models.Option).filter(models.Option.option_pk == request['pk']).first()
                return_list.append({
                'optionPK' : option.option_pk,
                'optionName': option.option_name,
                'optionPrice' : option.option_price,
                'optionSoldout' : option.option_soldout
                })
            except:
                return Response (status = 404)
        return {'data' : return_list}, 200

    def post(self):
        request = Option.parser.parse_args()

        if request['option_name'] and request['option_price'] and request['option_soldout'] == None:
            return Response(status = 400)

        option_menu = models.Option()
        option_menu.option_name = request['option_name']
        option_menu.option_price = request['option_price']
        option_menu.option_soldout = request['option_soldout']

        main_menu = session.query(models.Menu).filter_by(menu_pk = request["menu_pk"]).first()

        session.add(option_menu)
        session.flush()
        session.commit()
        
        main_menu.options.append(option_menu)

        for i in main_menu.options:
            print(i)
        session.commit()

        return Response(status = 201)

    def patch(self):
        request = Option.parser.parse_args()

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
        return Response(status = 204)

    def delete(self):
        request = Option.parser.parse_args()

        if request['option_pk'] == None:
            return Response(status = 400)

        session.execute("DELETE FROM OPTIONS WHERE option_pk = {}".format(request['option_pk']))
        session.commit()

        return Response(status = 200)