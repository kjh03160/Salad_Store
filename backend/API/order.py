import models
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, request, abort, Response
from database import session, Base, engine
from datetime import date, datetime
import json 
from API.method import *

class Order(Resource):
    # Order 클래스에서 받을 수 있는 파라미터 설정
    parser = reqparse.RequestParser()

    # [GET, DELETE, PUT] 에서 특정 행을 조회할 때 필요한 pk 파라미터
    """
    [
        {'order_pk': int,
         'order_time' : str,
         'menus': [
             {'product_pk': int, 
              'menu_name': str, 
              'quantity': str, 
              'options': [str(option_name), str, ....]},
              ....
              ]
        },
        {'order_pk': int,
            ....
        },
        ...
    ]
    """
    parser.add_argument('pk',
        type=int,
        required = False,
        help = 'if you want to get specific order, give the pk as a parameter'
        )


    # POST에서 주문 정보를 받기 위한 파라미터
    """
    [
        'total_price' : int,
        'menus' : [
            {'menu_pk': int,
             'options' : [
                     int(option_pk), int(option_pk), ...
                    ]      
            }
        ]
    ]
    """
    parser.add_argument('data', 
        action='append', 
        required=False,
        help = 'Order information to insert OrderDB'
        )


    def get(self):
        data = Order.parser.parse_args()
        result = None
        if data['pk']:  # 만약 특정 pk 쿼리라면
            order_sql = """
                        SELECT   
                        ORD.order_pk, DATE_FORMAT(order_time,  '%Y-%m-%d %H:%i:%s') as order_time, completed, total_price,  menu_name, quantity, option_name 
                                    FROM ORDERS ORD
                                    JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
                                    LEFT JOIN ORDER_OPTIONS ORD_OP USING (product_pk)
                                    JOIN MENUS M ON (M.menu_pk = ORD_PRD.order_menu_pk)
                                    LEFT JOIN OPTIONS USING (option_pk)
                                    WHERE ORD.order_pk = {pk}
                        """.format(pk = data['pk'])
        
        else:
            order_sql = """
                        SELECT   
                        ORD.order_pk, DATE_FORMAT(order_time,  '%Y-%m-%d %H:%i:%s') as order_time, completed, total_price,  menu_name, quantity, ORD_PRD.product_pk, option_name 
                                FROM ORDERS ORD
                                JOIN ORDER_PRODUCTS ORD_PRD USING(order_pk)
                                LEFT JOIN ORDER_OPTIONS ORD_OP USING (product_pk)
                                JOIN MENUS M ON (M.menu_pk = ORD_PRD.order_menu_pk)
                                LEFT JOIN OPTIONS USING (option_pk)
                                WHERE ORD.order_time between DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY),  '%Y-%m-%d') and DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 SECOND), '%Y-%m-%d %H:%i:%s') 
                                ORDER BY ORD.order_pk, M.menu_pk;
                        """
        result = session.execute(order_sql).fetchall()
        session.close()
        result = query_to_dict(result)

        if not result[0]:   # 쿼리 결과가 없을 경우
            return Response(status=404)
        result = many_to_one(result)
        return  {'orderList' : result}, 200


    def post(self):
        args = Order.parser.parse_args()

        data = json.loads(args['data'][0].replace("\'", "\""))  # json 형식에 맞게 작은따옴표를 쌍따옴표로 바꾸고 dictionary화

        # Orders Table
        # 총 금액
        total_price = data['totalPrice']
        try:
            order_time = datetime.now() # 주문 시각
            order = models.Order(order_time = order_time, completed = False, total_price = total_price) # 주문 행 생성
            session.add(order)
            session.flush() # 주문 메뉴 연결하기 위해 pk 생성 필요

            # 넘겨받은 주문 메뉴 리스트
            menu_list = data['menus']

            for each in menu_list:
                # Products Table
                # 주문 메뉴 1개에 대한 Product Table 레코드 생성
                order_menu_pk = each['menuId']  # 메뉴 pk
                quantity = each['quantity'] # 수량
                product = models.OrderProduct(order_pk = order.order_pk, 
                                                order_menu_pk = order_menu_pk, quantity = quantity)
                session.add(product)
                session.flush() # 주문 옵션을 연결하기 위해 pk 생성 필요
                product_pk = product.product_pk


                # Order_options Table
                # 주문 옵션 리스트
                for each_option in each['options']:
                    option_id = each_option # 옵션 pk
                    product_option = models.OrderOption(product_pk=product_pk, option_pk=option_id) # 주문 메뉴와 연결
                    session.add(product_option)

            session.commit()    # 아무 문제 없으면 DB 반영

        except Exception as err:
            session.rollback()  # 에러 시 rollback
            return Response(status=400) # 에러코드 전송
        session.close()

        # 문제 없다면
        return Response(status=201) # CREATED 코드 전송


    # completed 완료 요청
    def patch(self):
        data = Order.parser.parse_args()
        if data['pk']:
            instance = session.query(models.Order).get(data['pk'])
            instance.completed = True
            session.commit()
        else:
            Response(status=400)    # pk 값 없음 에러 전달
        session.close()

        return Response(status=204) # 처리 완료 코드 전달


    def delete(self):   # 주문 삭제 -> 거의 사용할 일 없을 것임.
        data = Order.parser.parse_args()
        # Orders Table에서 삭제할 레코드 pk 조회
        instance = session.query(models.Order).get(data['pk'])
        
        # 해당 값이 없다면
        if instance is None:
            return Response(status = 404)   # Not Found 에러 코드 전송
        
        # 행 삭제 및 commit
        session.delete(instance)
        session.commit()
        return Response(status=204) # 처리 완료 코드 전송