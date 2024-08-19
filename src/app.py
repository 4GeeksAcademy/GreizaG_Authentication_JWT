"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import User
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_bcrypt import Bcrypt

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.getenv("JWT-KEY") # super secret
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route("/api/newuser", methods=['POST'])
def new_user():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes ingresar información'}), 400 # 400 Bad Request
    if 'name' not in body:
        return jsonify({'msg': 'Debes ingresar nombre'}), 400
    if 'last_name' not in body:
        return jsonify({'msg': 'Debes ingresar apellido'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Debes ingresar email'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'Debes ingresar la contraseña'}), 400
    
    new_user = User()
    new_user.name = body["name"]
    new_user.last_name = body["last_name"]
    new_user.email = body["email"]
    pw_hash = bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    new_user.password = pw_hash
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"data": new_user.serialize()}), 201

@app.route("/api/login", methods=["POST"])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debes ingresar información'}), 400 # 400 Bad Request
    if 'email' not in body:
        return jsonify({'msg': 'Debes ingresar email'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'Debes ingresar la contraseña'}), 400
    
    user = User.query.filter_by(email=body['email']).first()
    print(user)
    if user and bcrypt.check_password_hash(user.password, body['password']):
    # if user and user.password == body['password']:
        access_token = create_access_token(identity={"email": user.email})
        return jsonify({"msg": "ok", "access_token": access_token}), 200

@app.route("/api/private/singleuser", methods=['GET'])
@jwt_required()
def get_single_user():
    identity = get_jwt_identity()
    print(identity)
    single_user = User.query.filter_by(email=identity['email']).first()
    if single_user is None:
        return jsonify({'msg': 'No existe usuario con la información indicada'}), 401
    return jsonify({'user': single_user.serialize()}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
