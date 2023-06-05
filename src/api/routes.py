"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Obtén los datos del cuerpo de la petición
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Both email and password are required"}), 400

    # Verifica si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists"}), 400


    # Crea y guarda el nuevo usuario
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Obtén los datos del cuerpo de la petición
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Both email and password are required"}), 400

    # Verifica si el usuario existe
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Verifica si la contraseña es correcta
    if not user.password == password:
        return jsonify({"message": "Password is incorrect"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

    
