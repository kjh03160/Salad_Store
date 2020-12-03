from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from models import db
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from API.method import *

temp_dir = os.path.abspath("Salad_Store").split('/')[:-1]
temp_dir = '/'.join(temp_dir)
saveImgDir = os.path.join(temp_dir,'static','images')
serverImgDir = os.path.join('http://localhost:5000/','static','images')   


class Menu(Resource): 

    parser = reqparse.RequestParser()
    parser.add_argument('data', action = 'append', required = False, help = 'data is missing')
    parser.add_argument('pk', type = int, required = False, help = 'pk not valid')
    
    parser.add_argument('type', type = str ,required=False)

    def get(self):
        request = Menu.parser.parse_args()
        return_list = []
        if request['pk'] == None:
            menus = session.query(models.Menu).all()
            if menus == None:
                return Response(status = 404)
            for menu in menus:
                return_list.append({
                'menuPk' : menu.menu_pk,
                'categoryPk': menu.category_pk,
                'menuName' : menu.menu_name,
                'menuPrice' : menu.menu_price,
                'menuSoldout' : menu.menu_soldout,
                'menuDescription' : menu.menu_description,
                'menuImage' : menu.menu_image
                })
        else:
            try:
                menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
                return_list.append({
                'menuPk' : menu.menu_pk,
                'categoryPk': menu.category_pk,
                'menuName' : menu.menu_name,
                'menuPrice' : menu.menu_price,
                'menuSoldout' : menu.menu_soldout,
                'menuDescription' : menu.menu_description,
                'menuImage' : menu.menu_image
                })
            except:
                return Response (status = 404)
        
        return {'data' : return_list}, 200

    def post(self):
        print(temp_dir)
        print(saveImgDir)
        data = Menu.parser.parse_args()
        server_path = '' 
        if data["type"] =="main_soldout":
            main_menu = session.query(models.Menu).filter(models.Menu.menu_pk == data['pk']).first()
            main_menu.menu_soldout = [1,0][main_menu.menu_soldout]            
            session.commit()
            return Response(status=201)
        elif data['type'] == "option_soldout":
            option = session.query(models.Option).filter(models.Option.option_pk== data['pk']).first()
            option.option_soldout = [1,0][option.option_soldout]
            session.commit()
            return Response(status=201)

        data = request.form
        if 'category_pk' not in data.keys():
            return Response(status = 404)
        print(data,'sadfasdfsadfasfasfdwlkem    lsdnsklnfak skdafnkfnaskdfjnsadkjfnsa\n\n')
        if 'image' in request.files:
            image = request.files['image']
            local_path = os.path.join(saveImgDir, 'main/', secure_filename(image.filename))
            image.save(local_path)
            server_path = os.path.join(serverImgDir, 'main/', secure_filename(image.filename))
        
        main_menu = models.Menu()
        
        if server_path != '':
            main_menu.menu_image = server_path
        
        
        for i in data.keys():
            if i == 'category_pk':
                main_menu.category_pk = data['category_pk']
            elif i == 'menu_name':
                main_menu.menu_name = data['menu_name']
            elif i == 'menu_price':
                main_menu.menu_price = data['menu_price']
            elif i == 'menu_soldout':
                main_menu.menu_soldout = data['menu_soldout']
            elif i == 'menu_description':
                main_menu.menu_description = data['menu_description']
        
        session.add(main_menu)
        session.flush()
        session.commit()
        return Response(status = 201)

    def patch(self):
        data = request.form
        server_path = '' 
        print(data['menu_pk'])
        if 'menu_pk' not in data.keys():
            return Response(status = 404)

        menu = session.query(models.Menu).filter(models.Menu.menu_pk == data['menu_pk']).first()

        if 'image' in request.files:
            if menu.menu_image:
                past_image = menu.menu_image
                file_name = past_image.split('/')[-1]
                os.remove(os.path.join(saveImgDir,'main/',file_name))
            image = request.files['image']
            local_path = os.path.join(saveImgDir, 'main/', secure_filename(image.filename))
            image.save(local_path)
            server_path = os.path.join(serverImgDir, 'main/', secure_filename(image.filename))
            menu.menu_image = server_path

        for i in data.keys():
            if i == 'category_pk':
                menu.category_pk = data['category_pk']
            elif i == 'menu_name':
                menu.menu_name = data['menu_name']
            elif i == 'menu_price':
                menu.menu_price = data['menu_price']
            elif i == 'menu_soldout':
                menu.menu_soldout = data['menu_soldout']
            elif i == 'menu_description':
                menu.menu_description = data['menu_description']

        session.commit()
        return Response(status = 204)

        
    def delete(self):
        request = Menu.parser.parse_args()
        print(request)

        if request['pk'] == None:
            return Response (status = 400)
        
        sql = f"delete from menus where menu_pk = {request['pk']}"
        session.execute(sql)
        # menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
        # session.delete(menu)
        session.commit()
        return Response(status = 200)
        