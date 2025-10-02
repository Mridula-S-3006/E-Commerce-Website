# routes/admin_routes.py
from flask import Blueprint, request, jsonify
from models.user import User
from models.product import Product
from models.order import Order
from models import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

admin_bp = Blueprint("admin", __name__)

# Admin login
@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.json
    user = User.query.filter_by(email=data.get("email"), is_admin=True).first()
    if not user or not user.check_password(data.get("password")):
        return jsonify({"msg": "Invalid admin credentials"}), 401

    token = create_access_token(identity={"user_id": user.id, "is_admin": True})
    return jsonify({"msg": "Admin login successful", "access_token": token})

# Add product
@admin_bp.route("/add-product", methods=["POST"])
@jwt_required()
def add_product():
    identity = get_jwt_identity()
    if not identity["is_admin"]:
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.json
    product = Product(
        name=data["name"],
        price=data["price"],
        stock=data["stock"],
        description=data.get("description", "")
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"msg": "Product added", "product_id": product.id})

# View all users
@admin_bp.route("/users", methods=["GET"])
@jwt_required()
def view_users():
    identity = get_jwt_identity()
    if not identity["is_admin"]:
        return jsonify({"msg": "Unauthorized"}), 403

    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "username": u.username,
        "email": u.email
    } for u in users])

# View all orders
@admin_bp.route("/orders", methods=["GET"])
@jwt_required()
def view_orders():
    identity = get_jwt_identity()
    if not identity["is_admin"]:
        return jsonify({"msg": "Unauthorized"}), 403

    orders = Order.query.all()
    return jsonify([{
        "order_id": o.id,
        "user_id": o.user_id,
        "total_price": o.total_price,
        "status": o.status
    } for o in orders])
