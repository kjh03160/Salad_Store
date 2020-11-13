# coding: utf-8
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy.orm import backref

db = SQLAlchemy()



class Category(db.Model):
    __tablename__ = 'categories'

    category_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String(45), nullable=False, unique=True)



class Menu(db.Model):
    __tablename__ = 'menus'

    menu_pk = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    category_pk = db.Column(db.ForeignKey('categories.category_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    menu_name = db.Column(db.String(45))
    menu_price = db.Column(db.Integer)
    menu_soldout = db.Column(db.Integer)
    menu_description = db.Column(db.String)
    menu_image = db.Column(db.String(200))

    category = db.relationship('Category', primaryjoin='Menu.category_pk == Category.category_pk', backref='menus')
    options = db.relationship('Option', secondary='option_relation', backref='menus')



t_option_relation = db.Table(
    'option_relation',
    db.Column('op_menu_pk', db.ForeignKey('menus.menu_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False),
    db.Column('op_option_pk', db.ForeignKey('options.option_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
)



class Option(db.Model):
    __tablename__ = 'options'

    option_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    option_name = db.Column(db.String(100), nullable=False)
    option_price = db.Column(db.Integer, nullable=False)
    option_soldout = db.Column(db.Integer, nullable=False)



class OrderOption(db.Model):
    __tablename__ = 'order_options'

    product_pk = db.Column(db.ForeignKey('order_products.product_pk'), nullable=False, index=True, primary_key=True)
    option_pk = db.Column(db.ForeignKey('options.option_pk', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True, primary_key=True)

    option = db.relationship('Option', primaryjoin='OrderOption.option_pk == Option.option_pk', backref='order_options')
    order_product1 = db.relationship('OrderProduct', primaryjoin='OrderOption.product_pk == OrderProduct.product_pk', backref='orderproduct_order_options_0')



class OrderProduct(db.Model):
    __tablename__ = 'order_products'

    product_pk = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    order_pk = db.Column(db.ForeignKey('orders.order_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    order_menu_pk = db.Column(db.ForeignKey('menus.menu_pk', ondelete='CASCADE',onupdate='CASCADE'), nullable=False, index=True)
    quantity = db.Column(db.Integer)

    menu = db.relationship('Menu', primaryjoin='OrderProduct.order_menu_pk == Menu.menu_pk', backref='order_products')
    order = db.relationship("Order", back_populates="order_product")  # back_popluates 는 부모테이블에 명시된 관계 변수 이름
    

class Order(db.Model):
    __tablename__ = 'orders'

    order_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_time = db.Column(db.DateTime, index=True)
    completed = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer)

    order_product = db.relationship('OrderProduct', cascade='all, delete, delete-orphan', backref='Order', passive_deletes=True)



class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String, nullable=False)
    is_super = db.Column(db.Integer, nullable=False)
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)