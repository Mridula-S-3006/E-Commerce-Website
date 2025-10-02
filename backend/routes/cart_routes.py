# routes/cart_routes.py
from flask import Blueprint, request, jsonify
from models.cart import Cart
from models import db
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_bp = Blueprint("cart", __name__)

# Add item to cart
@cart_bp.route("/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    identity = get_jwt_identity()
    user_id = identity["user_id"]
    data = request.json

    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not product_id:
        return jsonify({"msg": "product_id required"}), 400

    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()
    return jsonify({"msg": "Item added to cart"})

# View cart
@cart_bp.route("/", methods=["GET"])
@jwt_required()
def view_cart():
    identity = get_jwt_identity()
    user_id = identity["user_id"]
    items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "product_id": item.product_id,
        "quantity": item.quantity
    } for item in items])
