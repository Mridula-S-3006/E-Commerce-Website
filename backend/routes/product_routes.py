# routes/product_routes.py
from flask import Blueprint, jsonify
from models.product import Product

product_bp = Blueprint("product", __name__)

# Get all products
@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "stock": p.stock,
        "description": p.description
    } for p in products])

# Get single product
@product_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    p = Product.query.get(product_id)
    if not p:
        return jsonify({"msg": "Product not found"}), 404
    return jsonify({
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "stock": p.stock,
        "description": p.description
    })
