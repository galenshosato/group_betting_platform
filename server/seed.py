# from app import app
# from extensions import db
# from models import User
# import bcrypt


# if __name__ == "__main__":
#     with app.app_context():
#         print("Hashing Passwords...")
#         users = User.query.all()

#         for user in users:
#             password = user.password
#             hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
#             user.password = hashed_password
#             db.session.add(user)

#         db.session.commit()
