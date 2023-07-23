from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    money = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    bets = db.relationship('Bet', backref='user')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "money": self.money,
            "bets": {"current_bets": [current_bet.to_dict() for current_bet in self.bets],
                     "past_bets": [past_bet.to_dict() for past_bet in self.bets if past_bet.updated_at != past_bet.created_at]
                     }
        }

    def __repr__(self):
        return f"<User {self.name}>"
    
class Bet(db.Model):
    __tablename__ = 'bets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bet_name = db.Column(db.String)
    amount = db.Column(db.Integer)
    odds = db.Column(db.Integer)
    winnings = db.Column(db.Integer)
    hit = db.Column(db.Boolean)
    week = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "bet_name": self.bet_name,
            "amount": self.amount,
            "odds": self.odds,
            "winnings": self.winnings,
            "hit": self.hit,
            "week": self.week,
            "created_at": self.created_at,
            "updated_at": self.updated_at 
        }

