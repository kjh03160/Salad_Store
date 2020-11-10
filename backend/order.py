import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request
from database import session, Base, engine
from datetime import date, datetime
import json

def query_to_dict(ret):
    if ret is not None:
        return [{key: value for key, value in row.items()} for row in ret if row is not None]
    else:
        return [{}]

# from main import api
class Order(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('data', action='append', required=False)
    parser.add_argument('pk',
        type=int,
        required = False,
        help = 'start date of finding orders'
        )
    def get(self):
        data = Order.parser.parse_args()

        if data['pk']:
            pass
        

        else:
            order_sql = """
                        SELECT   
                        order_pk, DATE_FORMAT(order_time,  '%Y-%m-%d %H:%i:%s') as order_time, completed, total_price,  menu_name, quantity, option_name 
                                    FROM ORDERS ORD
                                    JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
                                    JOIN MENUS M ON (M.menu_pk = product_pk)
                                    JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.order_product_pk)
                                    JOIN OPTIONS OP ON (ORD_OP.order_option_pk = OP.option_pk)
                                    WHERE ORD.order_time between DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY),  '%Y-%m-%d') and DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 SECOND), '%Y-%m-%d %H:%i:%s') 
                                    AND ORD.completed=False;
                        """
            result = session.execute(order_sql).fetchall()
            result = query_to_dict(result)
        return  json.dumps({'token' : result}), 200
    
    # result = s.execute('SELECT * FROM my_table WHERE my_column = :val', {'val': 5})

    # https://www.daleseo.com/python-datetime/
    def post(self):
        args = Order.parser.parse_args()
        data = args['data']

        # # 주문 번호 생성
        # total_price = 1000
        # order_time = datetime.now()
        # order = models.Order(order_time = order_time, completed = False, total_price = total_price)
        # session.add(order)
        # session.flush()

        # # 주문 메뉴 생성
        # product_count = 1
        # order_menu_pk = 3
        # quantity = 1
        # product = models.OrderProduct(product_pk = product_count, order_pk = order.order_pk, 
        #                                 order_menu_pk = order_menu_pk, quantity = quantity)
        # session.add(product)

        # session.flush()
        # product_pk = product.product_pk
        
        # # 주문 옵션 연결
        # # https://gungadinn.github.io/data/2019/07/09/ORM/
        # option_id = 1
        # # selected_option = session.query(models.Option).get(option_id)
        # # print(selected_option.option_name)
        # order_insert_insert_sql = """
        #     INSERT INTO ORDER_OPTIONS VALUES ({product}, {option})
        # """.format(product = product_pk, option = option_id)

        # session.execute(order_insert_insert_sql)
        # # session.add(option)
        # session.commit()

        
        # order_sql = """
        #             SELECT   
        #             order_pk, order_time, completed, total_price,  menu_name, quantity, option_name 
        #                         FROM ORDERS ORD
        #                         JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
        #                         JOIN MENUS M ON (M.menu_pk = product_pk)
        #                         JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.order_product_pk)
        #                         JOIN OPTIONS OP ON (ORD_OP.order_option_pk = OP.option_pk)
        #                         WHERE ORD.completed=False;
        #             """
        
        # result = session.execute(order_sql).fetchall()

        # print(result[0])
        return 201

    def put(self):
        data = Order.parser.parse_args()
        print(data)
        return 200

    def delete(self):
        data = Order.parser.parse_args()
        print(data)
        return 204

# class Test(Resource):
#     def get(self):
#         x = session.query(models.Menu).get([1, 1])
#         print(x.menu_name)
#         print(x.options)
#         for i in x.options:
#             print(i.option_name)

#         product = models.OrderProduct()
#         option = session.query(models.Option).get(1)
#         product.options.append(option)
#         print(product.options, option)
#         return 200