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

# Routes for logging in, checking cookies, and logout
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter(User.email == email and User.password == password).first()

        if not user:
            return make_response(jsonify({"error":"invalid login"}))
        browser_session['user_id'] = user.id

        return make_response(jsonify(user.to_dict()), 201)

@app.route('/api/check_session')
def get_user():
    user = User.query.filter(User.id == browser_session.get('user_id')).first()

    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({'message': '401: Not Authorized'}), 401
    
@app.route('/api/logout', methods =['POST'])
def logout():
    browser_session.clear()
    response = make_response(jsonify({'response':'You have successfully logged out'}), 200)
    response.delete_cookie('browser_session')
    return response

# Changing password for User
@app.route('/api/change_pass', methods = ['POST'])
def change_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')
    
    #Find the user in the database
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message':'User not found'}), 404
    
    #Check if the old password is the same as the new password
    if user.password == new_password:
        return jsonify({'message':'Password is the same. Please choose a new password'}), 401
    
    #Update the password
    user.password = new_password
    db.session.commit()

# Getting users and adding a new user for dev
@app.route('/api/users', methods=['GET','POST'])
def get_users():
    if request.method == 'GET':
        users = User.query.all()
        user_dict = [user.to_dict() for user in users]
        return make_response(jsonify(user_dict), 200)
    elif request.method == 'POST':
        new_user = User()
        data = request.get_json()
        for field in data:
            setattr(new_user, field, data[field])
        
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(new_user.to_dict()), 200)

# Getting bet information and adding a bet
@app.route('/api/<int:id>/bets')
def get_bets_by_id(id):
    user = User.query.filter_by(id=id).first()
    bets = [bet.to_dict() for bet in user.bets]
    return make_response(jsonify(bets), 200)

@app.route('/api/<int:id>/currentbets', methods=['GET','POST'])
def get_current_bets(id):
    user = User.query.filter_by(id=id).first()

    if request.method == 'GET':
        current_bets = user.bets['current_bets']
        current_bets_dict = [bet.to_dict() for bet in current_bets]
        return make_response(jsonify(current_bets_dict), 200)
    
    elif request.method =='POST':
        new_bet = Bet()
        data = request.get_json()
        for field in data:
            setattr(new_bet, field, data[field])
        db.session.add(new_bet)
        db.session.commit()
        return make_response(jsonify(new_bet.to_dict()), 200)

@app.route('/api/<int:id>/pastbets')
def get_past_bets(id):
    user = User.query.filter_by(id=id).first()
    past_bets = user.bets['past_bets']
    past_bets_dict = [bet.to_dict() for bet in past_bets]
    return make_response(jsonify(past_bets_dict), 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)