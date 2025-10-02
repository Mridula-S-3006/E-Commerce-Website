# routes/order_routes.py
from flask import Blueprint, request, jsonify
from models.order import Order
from models.cart import Cart
from models import db
from flask_jwt_extended import jwt_required, get_jwt_identity

order_bp = Blueprint("order", __name__)

# Place order
@order_bp.route("/place", methods=["POST"])
@jwt_required()
def place_order():
    identity = get_jwt_identity()
    user_id = identity["user_id"]

    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"msg": "Cart is empty"}), 400

    total_price = sum([item.product.price * item.quantity for item in cart_items])

    order = Order(user_id=user_id, total_price=total_price, status="Pending")
    db.session.add(order)

    # Clear cart
    for item in cart_items:
        db.session.delete(item)

    db.session.commit()
    return jsonify({"msg": "Order placed successfully", "order_id": order.id})

# Get all orders of user
@order_bp.route("/", methods=["GET"])
@jwt_required()
def get_orders():
    identity = get_jwt_identity()
    user_id = identity["user_id"]
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "order_id": o.id,
        "total_price": o.total_price,
        "status": o.status
    } for o in orders])
