from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from models import db
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

Base.metadata.create_all(bind=engine)

def create_app():
    app = Flask(__name__)
    db = {
        'user'     : 'root',		# 1
        'password' : 'b1234567',		# 2
        'host'     : 'localhost',	# 3
        'port'     : 3306,			# 4
        'database' : 'mysite'		# 5
        }
    DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    CORS(app, resources={r'*': {'origins': '*'}})
    models.db.init_app(app)
    return app

app = create_app()
api = Api(app)
app.secret_key = "super secret key"

with app.app_context():
    db.create_all()

@app.route("/") #라우팅 설정
def main():
    return "Welcome"
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

saveImgDir = os.path.join(app.root_path,'static','images')

serverImgDir = os.path.join('http://localhost:5000/','static','images')


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
        return Response(status = 200)      

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

        if request['pk'] == None:
            return Response (status = 400)
        
        menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
        session.delete(menu)
        session.commit()
        return Response(status = 200)

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
        
class All(Resource):
    def get(self):
        category = models.Category.query.all()
        category_list = []

        for i in category:
            temp = [i.category_pk, i.category_name]
            category_list.append(temp)

        print(category_list)

        menu = models.Menu.query.all()
        menu_list = []
        menu_option_relation = []

        for i in menu:
            temp = [i.menu_pk, i.category_pk, i.menu_name, i.menu_price, i.menu_soldout, i.menu_description, i.menu_image]
            for j in i.options:
                menu_option_relation.append([i.menu_pk, j.option_pk])
            menu_list.append(temp)

        print(menu_list)
        print(menu_option_relation)

        option = models.Option.query.all()
        option_list = []

        for i in option:
            temp = [i.option_pk, i.option_name, i.option_price, i.option_soldout]
            option_list.append(temp)
        
        return {'category' : category_list, 'main' : menu_list, 'option' : option_list, 'relation' : menu_option_relation}, 200


api.add_resource(All,'/all')
api.add_resource(Option,'/option')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')

if __name__=='__main__':
    app.run(debug=True)


























