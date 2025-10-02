from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify
from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required

# ------------------------
# Password helpers
# ------------------------
def hash_password(password: str) -> str:
    return generate_password_hash(password)

def verify_password(hashed: str, password: str) -> bool:
    return check_password_hash(hashed, password)


# ------------------------
# JWT / role helpers
# ------------------------
def admin_required(fn):
    """Decorator to protect admin routes."""
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        if not identity.get("is_admin"):
            return jsonify({"msg": "Unauthorized"}), 403
        return fn(*args, **kwargs)
    return wrapper


def user_required(fn):
    """Decorator to protect normal user routes."""
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        if identity.get("is_admin"):
            return jsonify({"msg": "Unauthorized"}), 403
        return fn(*args, **kwargs)
    return wrapper


# ------------------------
# Response formatting
# ------------------------
def success_response(data, msg="Success", status_code=200):
    return jsonify({"msg": msg, "data": data}), status_code

def error_response(msg="Error", status_code=400):
    return jsonify({"msg": msg}), status_code
