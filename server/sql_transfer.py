import csv
from app import app
from extensions import db
from models import Bet

if __name__ == "__main__":
    with app.app_context():
        sqlite_bets = Bet.query.all()

        csv_file_path = "sqlite_bet_data.csv"

        with open(csv_file_path, "w", newline="") as csvfile:
            csv_writer = csv.writer(csvfile)
            for bet in sqlite_bets:
                csv_writer.writerow(
                    [
                        bet.id,
                        bet.user_id,
                        bet.bet_name,
                        bet.bet_type,
                        bet.amount,
                        bet.odds,
                        bet.winnings,
                        bet.hit,
                        bet.week,
                        bet.created_at,
                        bet.updated_at,
                    ]
                )
