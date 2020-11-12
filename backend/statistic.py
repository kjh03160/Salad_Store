import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request
from database import session, Base, engine
from datetime import date, datetime

class Statistic(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('startDate', required=False, help = 'start date of filtering orders')
    parser.add_argument('endDate', required=False, help = 'end date of filtering orders')


    def get(self):
        data = Statistic.parser.parse_args()

        start_date = data['startDate']
        end_date = data['endDate']
        print(start_date)
        start_time = date.fromisoformat('2020-07-18')

        order_sql = """
                    SELECT * FROM ORDERS ORD
                                JOIN ORDER_PRODUCTS ORD_PRD ON(ORD.order_pk = ORD_PRD.order_pk)
                                JOIN MENUS M ON (M.menu_pk = ORD_PRD.order_menu_pk)
                                JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.order_product_pk)
                                JOIN OPTIONS OP ON (ORD_OP.order_option_pk = OP.option_pk)
                    """
        
        result = session.execute(order_sql).fetchall()
        print(result)


        return 200,  {'data' : [start_date, end_date]}
        
    # result = s.execute('SELECT * FROM my_table WHERE my_column = :val', {'val': 5})



    # https://www.daleseo.com/python-datetime/
    def post(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass
