# routes/user_routes.py
from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash

user_bp = Blueprint("user", __name__)

# User registration
@user_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Missing required fields"}), 400

    # Check if email exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already registered"}), 409

    user = User(
        username=data["username"],
        email=data["email"],
        is_admin=False
    )
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully", "user_id": user.id}), 201

# User login
@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not user.check_password(data.get("password")):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity={"user_id": user.id, "is_admin": user.is_admin})
    return jsonify({"msg": "Login successful", "access_token": access_token})

# Protected dashboard route
@user_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    identity = get_jwt_identity()
    user = User.query.get(identity["user_id"])
    return jsonify({
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin
    })
