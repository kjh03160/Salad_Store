from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models

class Soldout(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('type', type = str ,required=False)
    parser.add_argument('pk', type = int)

    def post(self):
        data = Soldout.parser.parse_args()
        if data["type"] == None:
            return Response(status=400)

        elif data["type"] =="main_soldout":
            try:
                main_menu = session.query(models.Menu).filter(models.Menu.menu_pk == data['pk']).first()
                main_menu.menu_soldout = [1,0][main_menu.menu_soldout]            
                session.commit()
                return Response(status=201)
            except:
                return Response(Status=404)

        elif data['type'] == "option_soldout":
            try:
                option = session.query(models.Option).filter(models.Option.option_pk== data['pk']).first()
                option.option_soldout = [1,0][option.option_soldout]
                session.commit()
                return Response(status=201)
            except:
                return Response(status=404)