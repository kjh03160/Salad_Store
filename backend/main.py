from flask import Flask, request, jsonify
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from flask_cors import CORS

Base.metadata.create_all(bind=engine)

def create_app():
    app = Flask(__name__)
    db = {
        'user'     : 'root',		# 1
        'password' : 'password',		# 2
        'host'     : 'localhost',	# 3
        'port'     : 3306,			# 4
        'database' : 'mysite'		# 5
        }
    DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    models.db.init_app(app)
    return app

app = create_app()
CORS(app, resources={r'*': {'origins': '*'}})
api = Api(app)
app.secret_key = "super secret key"


class Index(Resource):
    def get(self):
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

api.add_resource(Index, '/menu')

if __name__=='__main__':
    
    app.run(debug=True)