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

        bet1 = Bet(
            bet_name="Test Bet 1",
            amount=100,
            winnings=200,
            odds=200,
            week=3,
            user_id=1,
            bet_type="weekly",
        )
        bet2 = Bet(
            bet_name="Test Bet 2",
            amount=500,
            winnings=300,
            odds=-350,
            week=1,
            user_id=1,
            bet_type="weekly",
        )
        bet3 = Bet(
            bet_name="Test Bet 3",
            amount=1000,
            winnings=500,
            odds=150,
            week=0,
            user_id=1,
            bet_type="futures",
        )
        bet4 = Bet(
            bet_name="Test Bet 4",
            amount=1500,
            winnings=30,
            odds=-750,
            week=0,
            user_id=1,
            bet_type="futures",
        )

        db.session.add_all(users)
        db.session.add_all([bet1, bet2, bet3, bet4])
        db.session.commit()
