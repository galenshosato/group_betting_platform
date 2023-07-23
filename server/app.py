from flask import Flask, jsonify, request, make_response, Response, session as browser_session
from extensions import *
from models import User, Bet   


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# mysql://username:password@host:port/database_name for mySQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'woohoo secret key'

db.init_app(app)
migrate.init_app(app, db)

@app.route('/')
def home():
    return 'Welcome to the Fake Betting API'

if __name__ == '__main__':
    app.run(port=5555, debug=True)