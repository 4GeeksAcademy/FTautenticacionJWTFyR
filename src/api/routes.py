"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'mmm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/Signup', methods=['POST'])
def signup():

    try:

        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email and password are required"}), 400

        existing_user = User.query.filter_by(email=data['email']).first()

        if existing_user:
            return jsonify({"msg": "user already exists"}), 400

        hashed_pw = generate_password_hash(data['password'])
        new_user = User(email=data['email'],
                        password=hashed_pw, is_active=True)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "user created"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"Error Server"}), 500


@api.route('/Login', methods=['POST'])
def login():

    try:
        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email and Password are required"}), 400

        user = User.query.filter_by(email=data['email']).first()

        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"message": "Invalid Credentials"}), 401

        token = create_access_token(identity=user.email)
        return jsonify(create_access_token=token), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"message": "Error Server"}), 500


@api.route('/Private', methods=['GET'])
@jwt_required()
def private():

    try:
        current_user = get_jwt_identity()

        return jsonify({"msg": f"welcome {current_user},you're in private route"}), 200

    except Exception as e:
        print("error en la route private", e)
        return jsonify({"msg": " Unautorized acces"}), 401
