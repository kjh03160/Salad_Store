import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request, abort, Response
from database import session, Base, engine
from datetime import date, datetime
import json 

def query_to_dict(ret):
    if ret is not None:
        return [{key: value for key, value in row.items()} for row in ret if row is not None]
    else:
        return [{}]

def many_to_one(menu):
    pass

# from main import api
class Order(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('data', 
        action='append', 
        required=False,
        help = 'Order information to insert OrderDB'
        )
    parser.add_argument('pk',
        type=int,
        required = False,
        help = 'if you want to get specific order, give the pk as a parameter'
        )

    def get(self):
        data = Order.parser.parse_args()
        result = None
        if data['pk']:
            pass
        
        else:
            order_sql = """
                        SELECT   
                        ORD.order_pk, DATE_FORMAT(order_time,  '%Y-%m-%d %H:%i:%s') as order_time, completed, total_price,  menu_name, quantity, option_name 
                                    FROM ORDERS ORD
                                    JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
                                    JOIN MENUS M ON (M.menu_pk = ORD_PRD.order_menu_pk)
                                    JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.order_product_pk)
                                    JOIN OPTIONS OP ON (ORD_OP.order_option_pk = OP.option_pk)
                                    WHERE ORD.order_time between DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY),  '%Y-%m-%d') and DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 SECOND), '%Y-%m-%d %H:%i:%s') 
                                    AND ORD.completed=True;
                        """
            result = session.execute(order_sql).fetchall()
            result = query_to_dict(result)

            # order_list = []
            # temp_order = {}
            # for order in reuslt:
            #     temp_order['orderId'] = order['order_pk']
            #     temp_order['orderTime'] = order['order_time']
            #     temp_order['completed'] = order['completed']


        return  {'orderList' : result}, 200

    # result = s.execute('SELECT * FROM my_table WHERE my_column = :val', {'val': 5})

    # https://www.daleseo.com/python-datetime/
    def post(self):
        args = Order.parser.parse_args()

        data = json.loads(args['data'][0].replace("\'", "\""))
        print(data)
        # 주문 번호 생성
        total_price = data['totalPrice']
        try:
            order_time = datetime.now()
            order = models.Order(order_time = order_time, completed = False, total_price = total_price)
            session.add(order)
            session.flush()

            # 주문 메뉴 생성
            menu_list = data['menus']

            for each in menu_list:
                order_menu_pk = each['menuId']
                quantity = each['quantity']
                product = models.OrderProduct(order_pk = order.order_pk, 
                                                order_menu_pk = order_menu_pk, quantity = quantity)
                session.add(product)
                session.flush()
                product_pk = product.product_pk

            
                # 주문 옵션 연결
                # https://gungadinn.github.io/data/2019/07/09/ORM/

                for each_option in each['options']:
                    option_id = each_option
                    product_option = models.OrderOption(product_pk=product_pk, option_pk=option_id)
                    session.add(product_option)
                    
            session.commit()

        except Exception as err:
            print(err)
            session.rollback()
            return Response(status=400)
        # order_sql = """
        #             SELECT   
        #             ORD.order_pk, order_time, completed, total_price,  menu_name, quantity, option_name 
        #                         FROM ORDERS ORD
        #                         JOIN ORDER_PRODUCTS ORD_PRD ON(ORD.order_pk = ORD_PRD.order_pk)
        #                         JOIN MENUS M ON (M.menu_pk = ORD_PRD.order_menu_pk)
        #                         JOIN ORDER_OPTIONS ORD_OP ON (ORD_PRD.product_pk = ORD_OP.product_pk and ORD_PRD.order_pk = ORD_OP.order_pk)
        #                         JOIN OPTIONS OP ON (ORD_OP.option_pk = OP.option_pk)
        #                         WHERE ORD.completed=False;
        #             """
        
        # result = session.execute(order_sql).fetchall()

        # print(result[0])
        return Response(status=201)

    def put(self):
        data = Order.parser.parse_args()
        print(data)
        return Response(status=204)

    def delete(self):
        data = Order.parser.parse_args()
        # session.execute("DELETE FROM ORDERS WHERE ORDERS.order_pk = %d" % data['pk'])
        instance = session.query(models.Order).get(data['pk'])
        
        if instance is None:
            return Response(status = 404)
        
        session.delete(instance)
        session.commit()
        return Response(status=204)

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