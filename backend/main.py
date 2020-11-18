from flask import Flask, request, jsonify, render_template
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from models import db
from flask_cors import CORS

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


class Index(Resource):
    def get(self):
        # category에서 하나 뽑아와서
        user = models.Category(category_name="123333")  
        session.add(user)
        session.flush()
        print(user.category_pk)
        # print(session.new)
        # print(session.query(models.Category).get())
        menu = models.Menu(category_pk=user.category_pk, menu_name = 'gd')
        
        session.add(menu)
        print()
        session.flush()
        # session.commit()
        return {'result':user.category_pk, "2":menu.menu_pk}
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass


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
        data = Group.parser.parse_args()
        print(
        # print(request.files['text1'])
        if 'image' in request.files:
            print(request.files['image'])

        # data =  Group.parser.parse_args()
        # print(data['data'])
        # if (data['data'] != None):

     # name = request.json
        # print(name)
        # parser = reqparse.RequestParser()
        # parser.add_argument('name',type=str)
        # args = parser.parse_args()
        # print(args['name'])
        # return({'name':args['name']})
        # category = models.Category.query.all()
        # categoryDict = {}
        # for i in range(len(category)):
        #     categoryDict['categoryName'+str(i)] = category[i].category_name
        #     categoryDict['categoryId'+str(i)] = category[i].category_pk
        # return categoryDict

    # def post(self):
    #     name = request.json
    #     print(name)
    #     # category = models.Category(name)
    #     # session.add(category)
    #     # session.commit()
    #     pass

    def put(self):
        data = Group.parser.parse_args()
        if data['pk'] == None:
            print(1)
            pass
            #여기선 뭘하냐 전체를 갖다 바친다
        else:
            print(2)
            #여기선 뭘 하냐 pk를 갖다 바친다
            pass
        # parser = reqparse.RequestParser()
        # parser.add_argument('name',type=str)
        # args = parser.parse_args()
        # print(args['name'])
        # category = models.Category.get(Category_name = name)
        # category.name = rename
        # session.commit()
        pass
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

class mainMenu(Resource):
    def get(self):
        pass
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass

api.add_resource(Group,'/group')

api.add_resource(Index, '/menu')

if __name__=='__main__':
    app.run(debug=True)
