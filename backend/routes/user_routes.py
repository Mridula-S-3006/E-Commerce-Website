from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint("user", __name__)

# User registration
@user_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    username = data.get("username") or data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"msg": "All fields are required"}), 400

    # Check if email exists
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409

    user = User(
        username=username,
        email=email,
        is_admin=False
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "msg": "User registered successfully",
        "user_id": user.id,
        "username": user.username,
        "email": user.email
    }), 201

# User login
@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity={"user_id": user.id, "is_admin": user.is_admin})

    return jsonify({
        "msg": "Login successful",
        "access_token": access_token,
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin
    })

# Protected dashboard route
@user_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    identity = get_jwt_identity()
    user = User.query.get(identity["user_id"])
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin
    })
