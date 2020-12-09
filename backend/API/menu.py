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
    #request 해당 키 값으로 파싱 작업 수행
    parser = reqparse.RequestParser()
    # parser.add_argument('data', action = 'append', required = False, help = 'data is missing')
    parser.add_argument('pk', type = int, required = False, help = 'pk not valid')
    

    #menus database에 접근하기 위한 함수
    #pk 값이 없으면 menus 튜플 전체 반환, pk 값이 존재하면 해당 pk 값을 갖고 있는 튜플 반환
    def get(self):
        request = Menu.parser.parse_args()
        return_list = []
        if request['pk'] == None:
            menus = session.query(models.Menu).all()
            # 데이터가 존재하지 않기 때문에 404 반환
            if menus == None:
                return Response(status = 404)
            # 데이터베이스 객체 딕셔너리로 파싱 작업
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
            session.close()
        else:
            try:
                menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
                # 데이터베이스 객체 딕셔너리로 파싱 작업
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
                # 해당 pk값을 가진 데이터가 존재하지 않기 때문에 404 반환
                return Response (status = 404)
            finally:
                session.close()
        return {'data' : return_list}, 200

    #menus database에 추가하기 위한 함수
    def post(self):
        data = Menu.parser.parse_args()
        #경로를 위한 변수 설정
        server_path = '' 

        data = request.form
        if 'category_pk' not in data.keys():
            return Response(status = 404)

        if 'image' in request.files:
            #local_path 저장할 경로, server_path 이미지 접근 가능 url 저장
            image = request.files['image']
            local_path = os.path.join(saveImgDir, 'main/', secure_filename(image.filename))
            image.save(local_path)
            server_path = os.path.join(serverImgDir, 'main/', secure_filename(image.filename))
        
        main_menu = models.Menu()
        
        #request에 이미지 파일이 존재하면 객체 menu_image필드에 server_path 저장 
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
        session.close()
        return Response(status = 201)

    #menus database에 있는 튜플을 수정하기 위한 함수
    def patch(self):
        data = request.form
        server_path = '' 

        #patch에 필요한 값인 'menu_name'이 없으면 400 반환
        if 'menu_pk' not in data.keys():
            return Response(status = 404)

        menu = session.query(models.Menu).filter(models.Menu.menu_pk == data['menu_pk']).first()

        #수정하는 파일에 이미지가 포함되어 있을 경우 기존 이미지를 삭제하고 새로운 이미지 저장 후 menu_image 필드 값 수정
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
        session.close()
        return Response(status = 204)

    #menus database에 있는 튜플을 삭제하기 위한 함수
    def delete(self):
        request = Menu.parser.parse_args()

        #delete에 필요한 값인 'pk'가 없으면 400 반환
        if request['pk'] == None:
            return Response (status = 400)
        
        sql = f"delete from menus where menu_pk = {request['pk']}"
        session.execute(sql)
        session.commit()
        session.close()
        return Response(status = 200)
        