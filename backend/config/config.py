import os
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY','supersecretkeyhehehe')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL','postgresql:postgresqlmri2024@localhost:5432/ecommerce_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False