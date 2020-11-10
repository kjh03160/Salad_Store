import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request
from database import session, Base, engine
from datetime import date, datetime

class Statistic(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('startDate', action='append',
        type=str,
        required = True,
        help = 'start date of finding orders'
        )

        parser.add_argument('endDate',
        type = str,
        required = True,
        help = 'start date of finding orders'
        )

        data = parser.parse_args()

        start_date = data['startDate']
        end_date = data['endDate']
        print(start_date)
        start_time = date.fromisoformat('2020-07-18')

        order_sql = """
                    SELECT * FROM ORDERS ORD
                                JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
                                JOIN MENUS M ON (M.menu_pk = product_pk)
                                JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.order_product_pk)
                                JOIN OPTIONS OP ON (ORD_OP.order_option_pk = OP.option_pk)
                    """
        
        result = session.execute(order_sql).fetchall()
        print(result)


        return 200,  {'data' : [start_date, end_date]}
        
    # result = s.execute('SELECT * FROM my_table WHERE my_column = :val', {'val': 5})



    # https://www.daleseo.com/python-datetime/
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('data', 
        type=str,
        required = True,
        help = 'start date of finding orders'
        )
        print(request.json)

        return 200

    def put(self):
        print(data)
        pass
    def delete(self):
        data = request.json
        pass
