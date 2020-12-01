from flask import Flask, request, jsonify, render_template, Response
from database import session, Base, engine
from flask_restful import Resource, Api
from flask_restful import reqparse
import models
from API.method import *



class All(Resource):
    def get(self):
        category = models.Category.query.all()
        category_list = []

        for i in category:
            temp = {'categoryPk' : i.category_pk, 'categoryName' : i.category_name}
            category_list.append(temp)

        print(category_list)

        menu = models.Menu.query.all()
        menu_list = []
        menu_option_relation = []

        for i in menu:
            temp = {'menuPk' : i.menu_pk, 'categoryPk' : i.category_pk, 'menuName' : i.menu_name, 'menuPrice' : i.menu_price, 
            'menuSoldout' : i.menu_soldout, 'menuDescription' : i.menu_description, 'menuImage' : i.menu_image}
            for j in i.options:
                menu_option_relation.append({'menuPk' : i.menu_pk, 'optionPk' : j.option_pk})
            menu_list.append(temp)

        print(menu_list)
        print(menu_option_relation)

        option = models.Option.query.all()
        option_list = []

        for i in option:
            temp = {'optionPk' : i.option_pk, 'optionName' : i.option_name, 'optionPrice' : i.option_price, 'optionSoldout' : i.option_soldout}
            option_list.append(temp)
        
        return {'category' : category_list, 'main' : menu_list, 'option' : option_list, 'relation' : menu_option_relation}, 200