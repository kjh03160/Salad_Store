# coding: utf-8
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, Integer, String
from database import Base

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

    order_products = db.relationship('OrderProduct', secondary='order_options', backref='options')



t_order_options = db.Table(
    'order_options',
    db.Column('order_product_pk', db.ForeignKey('order_products.product_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False),
    db.Column('order_option_pk', db.ForeignKey('options.option_pk', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
)



class OrderProduct(db.Model):
    __tablename__ = 'order_products'

    product_pk = db.Column(db.Integer, primary_key=True, nullable=False)
    order_pk = db.Column(db.ForeignKey('orders.order_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    order_menu_pk = db.Column(db.ForeignKey('menus.menu_pk', onupdate='CASCADE'), nullable=False, index=True)
    quantity = db.Column(db.Integer)

    menu = db.relationship('Menu', primaryjoin='OrderProduct.order_menu_pk == Menu.menu_pk', backref='order_products')
    order = db.relationship('Order', primaryjoin='OrderProduct.order_pk == Order.order_pk', backref='order_products')



class Order(db.Model):
    __tablename__ = 'orders'

    order_pk = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    order_time = db.Column(db.DateTime, index=True)
    completed = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer)




class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String, nullable=False)
    is_super = db.Column(db.Integer, nullable=False)
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)