import pytest
import os
import sys
project_root = os.path.abspath(os.path.join(
                  os.path.dirname(__file__),
                  os.pardir)
)
sys.path.append(project_root)

from app import app, db, User, Bet
from flask_testing import TestCase
import json

class TestAPI(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        return app
    
    def setUp(self):
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_get_users(self):
        user1 = User(name='user1', weekly_money=100000)
        user2 = User(name='user2', weekly_money=40000)
        users = [user1, user2]
        db.session.add_all(users)
        db.session.commit()

        response = self.client.get('/api/users')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        print(data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], 'user1')
        self.assertEqual(data[1]['weekly_money'], 40000)
    
    def test_patch_users(self):
        user1 = User(name='user1', weekly_money=50000)
        user2 = User(name='user2', weekly_money=60000)
        db.session.add_all([user1,user2])
        db.session.commit()

        response = self.client.patch('/api/users')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['weekly_money'], 100000)
        self.assertEqual(data[1]['weekly_money'], 100000)


if __name__ == '__main__':
    pytest.main()