from app import app
from extensions import db
from models import User, Bet

if __name__ == "__main__":
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Bet.query.delete()
        print("Seeding Users...")

        users = [
            User(
                name="dev",
                email="dev@dev.com",
                password="123",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
                week=1,
            ),
            User(
                name="Galen",
                email="galen.sato@gmail.com",
                password="galensato",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
            User(
                name="Chris",
                email="chris.lanehart@gmail.com",
                password="fullLaneHart",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
            User(
                name="Grant",
                email="grant.markin@gmail.com",
                password="ChargeAhead23",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
            User(
                name="Morgan",
                email="morgantschlesinger@gmail.com",
                password="JackieParnassus",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
            User(
                name="Ethan",
                email="ethan.totten@gmail.com",
                password="highFivez4eva",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
            User(
                name="Alex",
                email="aaspear1@gmail.com",
                password="LoveThatL@Life",
                money=100000,
                weekly_money=100000,
                futures_money=40000,
            ),
        ]

        print("Seeding bets...")

        db.session.add_all(users)
        db.session.commit()
