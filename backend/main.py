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
                return_list.append({'category_pk':i.category_pk, 'category_name': i.category_name})
        else:
            try:
                category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
                return_list.append({'category_pk' : category.category_pk, 'category_name': category.category_name})
            except:
                return Response (status = 404)
        return {'data' : return_list}, 200

    def post(self):
        request = Category.parser.parse_args()
        if request['name'] == None:
            return Response(status = 400)
        elif session.query(models.Category).filter(models.Category.category_name == request['name']):
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
        print(request['pk'])
        if request['pk'] == None:
            return Response(status = 400)
        category = session.query(models.Category).filter(models.Category.category_pk == request['pk']).first()
        session.delete(category)
        session.commit()
        return Response(stauts = 200)

#request.json은 데이터 전체를 한번에 갖고 오는 거
#reqparse.RequestParser()를 이용해서 하나하나씩 parsing 해주는 것
class Group(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('data', action = 'append', required = False, help = 'put data')
    parser.add_argument('pk', type = int, required=False, help = 'show me valid pk')
    
    def get(self):
        data = Group.parser.parse_args()
        if data['pk'] == None:
            pass
            #여기선 뭘하냐 전체를 갖다 바친다
        else:
            #여기선 뭘 하냐 pk를 갖다 바친다
            pass

    def post(self):
        print(1)
        # data = Group.parser.parse_args()
        # print(request.files['text1'])
        data = request.form
        for i in data.values():
            print(i)
        if 'image' in request.files:
            image = request.files['image']
            path = os.path.join(saveImgDir,'main/',secure_filename(image.filename))
            image.save(path)

    def put(self):
        print(2)
        data = request.form
        print(data)
        print(request.files['image'])
        if 'image' in request.files:
            print(request.files['image'])
            # image = request.files['image']
            # path = os.path.join(saveImgDir,'main/',secure_filename(image.filename))
            
            # image.save(path)
        pass

    def patch(self):
        data= request.form
        for i in data.keys():
            print(i)
        if 'image' in request.files:
            # db에서 갖고 온 이미지 주소 중 마지막 부분인 파일을 떼오고
            # 이것을 이용해서 파일이 존재하는 지 확인한다
            # os.path.exists(file_path)
            # 파일이 있다면 해당 파일을 지우고 
            # 없으면 바로 저장한다
            print(request.files['image'])
            image = request.files['image']
            os.remove(os.path.join(saveImgDir,'main/','img1.jpg'))

    def delete(self):
        data = Group.parser.parse_args()
        if data['pk'] == None:
            print(1)
            pass
            #여기선 뭘하냐 전체를 갖다 바친다
        else:
            print(2)
            #여기선 뭘 하냐 pk를 갖다 바친다
            pass
        # name = request.json
        # print(name)
        # parser = reqparse.RequestParser()
        # parser.add_argument('name',type=str)
        # args = parser.parse_args()
        # print(args['name'])
        # category = models.Category.get(Category_name = name)
        # session.delete(category)
        # session.commit()
        pass

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
                'menu_pk' : menu.menu_pk,
                'category_pk': menu.category_pk,
                'menu_name' : menu.menu_name,
                'menu_price' : menu.menu_price,
                'menu_soldout' : menu.menu_soldout,
                'menu_description' : menu.menu_description,
                'menu_image' : menu.menu_image
                })
        else:
            try:
                menu = session.query(models.Menu).filter(models.Menu.menu_pk == request['pk']).first()
                return_list.append({
                'menu_pk' : menu.menu_pk,
                'category_pk': menu.category_pk,
                'menu_name' : menu.menu_name,
                'menu_price' : menu.menu_price,
                'menu_soldout' : menu.menu_soldout,
                'menu_description' : menu.menu_description,
                'menu_image' : menu.menu_image
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
            image = request.files['image']
            local_path = os.path.join(saveImgDir, 'main/', secure_filename(image.filename))
            image.save(local_path)
            server_path = os.path.join(serverImgDir, 'main/', secure_filename(image.filename))


        
    def delete(self):
        pass

























api.add_resource(Group,'/group')
api.add_resource(Category,'/category')
api.add_resource(Menu, '/menu')

if __name__=='__main__':
    app.run(debug=True)
