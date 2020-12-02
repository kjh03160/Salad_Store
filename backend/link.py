from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models

class Link(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('menu_pk', required = False, help = '')
    parser.add_argument('option_pk', required = False, help = '')

    def post(self):
        request = Link.parser.parse_args()
        
        if (request['option_pk'] and request['menu_pk']) == None:
            return Response(status = 400)

        main_menu = session.query(models.Menu).filter_by(menu_pk = request["menu_pk"]).first()
        if main_menu == None:
            return Response(status = 400)

        try:
            option_menu = session.query(models.Option).get(request['option_pk'])
<<<<<<< HEAD
            if option_menu in main_menu.options:
                return Response(status = 400)
                
=======
            print(option_menu)
>>>>>>> 8f4724707cc91e41531f459296d448f116fce0c4
            main_menu.options.append(option_menu)
            session.commit()
            return Response(status = 201)
        except:
<<<<<<< HEAD
            return Response(status = 400)

    def delete(self):
        request = Link.parser.parse_args()

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

    

=======
            return Response(status = 400)
>>>>>>> 8f4724707cc91e41531f459296d448f116fce0c4
