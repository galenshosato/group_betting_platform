from app import app
from extensions import db
from models import User

if __name__ == '__main__':
    with app.app_context():
        print('Clearing db...')
        User.query.delete()
        print('Seeding Users...')

        users = [
            User(name='Dev', email='dev@dev.com', password='123', money=0),
            User(name='Galen', email='galen.sato@gmail.com', password='galensato', money=100000 ),
            User(name='Chris', email='chris.lanehart@gmail.com', password='fullLaneHart', money=100000),
            User(name='Grant', email='grant.markin@gmail.com', password='ChargeAhead23', money=100000),
            User(name='Morgan', email='morgantschlesinger@gmail.com', password='JackieParnassus', money=100000)
        ]

        db.session.add_all(users)
        db.session.commit()