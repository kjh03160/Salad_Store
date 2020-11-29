from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine, DB_URL
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from models import db
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from all import All
from category import Category
from option import Option
from menu import Menu

Base.metadata.create_all(bind=engine)


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    models.db.init_app(app)
    CORS(app, resources={r'*': {'origins': '*'}})

    return app

app = create_app()
api = Api(app)

# with app.app_context():
#     db.create_all()

app.secret_key = "super secret key"


@app.route("/")  # 라우팅 설정
def main():
    return "Welcome"
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')

api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')

if __name__=='__main__':
    app.run(debug=True)

serverImgDir = os.path.join('http://localhost:5000/', 'static', 'images')

class Category(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', required = False, help = 'no name')
    parser.add_argument('pk', required = False, help = 'show me valid pk')

    def get(self):
        request = Category.parser.parse_args()
        return_list = []
        if request['pk'] == None:
            category = session.query(models.Category).all()
            if category == None:
                return Response(status = 404)
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
        if request['name'] == None:
            return Response(status = 400)
            print("wehre")
        elif session.query(models.Category).filter(models.Category.category_name == request['name']).count() > 0:
            return Response(status = 400)
        category = models.Category(category_name = request['name'])
        session.add(category)
        session.flush()
        session.commit()
        return Response(status = 201)

    def patch(self):
        request = Category.parser.parse_args()
        if (request['name'] == None) or (request['pk'] == None):
            return Response(status = 400)
        category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
        category.category_name = request['name']
        session.commit()
        return Response(status = 204)

    def delete(self):
        request = Category.parser.parse_args()
        if request['pk'] == None:
            return Response(status = 400)
        category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
        session.delete(category)
        session.commit()
        return Response(stauts = 200)      

class Menu(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('data', action = 'append', required = False, help = 'data is missing')
    parser.add_argument('pk', type = int, required = False, help = 'pk not valid')

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
        data = request.form
        server_path = '' 

        if 'category_pk' not in data.keys():
            return Response(status = 404)

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


        session.commit()
        return Response(status = 204)

        
    def delete(self):
        request = Menu.parser.parse_args()

        if request['pk'] == None:
            return Response (status = 400)
        
        menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
        session.delete(menu)
        session.commit()
        return Response(status = 200)

class Option(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('data', required = False, help = 'no name')
    parser.add_argument('pk', required = False, help = 'show me valid pk')

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


        if request['data'] == None:
            return Response(status = 400)


        for i in request['data'].keys():
            if i == 'option_name':
                option_menu.option_name = data['option_name']
            elif i == 'option_price':
                option_menu.option_price = data['option_price']
            elif i == 'option_soldout':
                option_menu.option_soldout = data['option_soldout']
        
        session.add(option_menu)
        session.flush()
        session.commit()
        return Response(status = 201)

    def patch(self):
        request = Option.parser.parse_args()
        if request['pk'] == None:
            return Response(status = 400)
        option = session.query(models.Option).filter(models.Option.option_pk == request['pk']).first()
        
        for i in request['data'].keys():
            if i == 'option_name':
                option.option_name = data['option_name']
            elif i == 'option_price':
                option.option_price = data['option_price']
            elif i == 'option_soldout':
                option.option_soldout = data['option_soldout']

        session.commit()
        return Response(status = 204)

    def delete(self):
        request = Option.parser.parse_args()

        if request['pk'] == None:
            return Response(status = 400)

        option = session.query(models.Option).filter(models.Option.option_pk == request['pk']).first()
        session.delete(option)
        session.commit()

        return Response(stauts = 200) 





















api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')

if __name__=='__main__':
    app.run(debug=True)


