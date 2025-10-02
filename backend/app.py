from flask import Flask
from flask_cors import CORS
from config.config import Config
from models import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager


from routes.user_routes import user_bp
from routes.product_routes import product_bp
from routes.cart_routes import cart_bp
from routes.order_routes import order_bp
from routes.admin_routes import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    JWTManager(app)

    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(order_bp, url_prefix="/api/orders")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
