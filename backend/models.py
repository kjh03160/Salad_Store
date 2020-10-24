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

    menu_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    category_pk = db.Column(db.ForeignKey('categories.category_pk', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    menu_name = db.Column(db.String(45))
    menu_price = db.Column(db.Integer)
    menu_soldout = db.Column(db.Integer)
    menu_description = db.Column(db.String)
    # menu_image = db.Column(db.LONGBLOB)

    category = db.relationship('Category', primaryjoin='Menu.category_pk == Category.category_pk', backref='menus')



class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String(45), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)