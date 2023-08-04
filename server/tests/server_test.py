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

    def test_post_users(self):
        new_user_data = {'name': 'new_user', 'weekly_money': 70000}
        response = self.client.post('/api/users', data=json.dumps(new_user_data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'new_user')
        self.assertEqual(data['weekly_money'], 70000)

        new_user = User.query.filter_by(name='new_user').first()
        self.assertIsNotNone(new_user)
        self.assertEqual(new_user.weekly_money, 70000)
    
    def test_change_password(self):
        user1 = User(name='user1', password = '12345')
        db.session.add(user1)
        db.session.commit()

        new_user_data = {'name':'user1', 'new_password': '54321'}
        response = self.client.post('/api/change_pass', data = json.dumps(new_user_data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertNotIn('password', data)

        test_user = User.query.filter_by(name='user1').first()
        self.assertIsNotNone(test_user)
        self.assertEqual(test_user.password, '54321')
    
    def test_get_bets_by_user_id(self):
        user = User(id = 1, name = 'user1', weekly_money = 50000)
        bet1 = Bet(amount= 100, winnings = 200, user_id = user.id)
        bet2 = Bet(amount = 500, winnings = 300, user_id = user.id)
        db.session.add(user)
        db.session.add_all([bet1, bet2])
        db.session.commit()

        response = self.client.get(f'/api/{user.id}/bets')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data[0]['amount'], 100)
        self.assertEqual(data[1]['winnings'], 300)
    
    def test_get_current_bets(self):
        user = User(id = 1, name = 'user1', weekly_money = 50000)
        bet1 = Bet(amount= 100, winnings = 200, bet_type = 'prop', user_id = user.id)
        bet2 = Bet(amount = 500, winnings = 300, bet_type = 'fuberes', user_id = user.id)
        db.session.add(user)
        db.session.add_all([bet1, bet2])
        db.session.commit()

        response = self.client.get(f'/api/{user.id}/current-weekly-bets')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data[0]['amount'], 100)
        self.assertEqual(data[1]['winnings'], 300)
    
    def test_post_bet(self):
        user = User(id = 1, name = 'user1', weekly_money=100000)
        db.session.add(user)
        db.session.commit()
        new_bet_data = {'amount': 20000, 'bet_type': 'prop', 'odds': 240, 'user_id': 1}
        response = self.client.post(f'/api/{user.id}/current-weekly-bets', data = json.dumps(new_bet_data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        test_user = User.query.filter_by(name='user1').first()
        self.assertEqual(data['bet_type'], 'prop')
        self.assertEqual(test_user.weekly_money, 80000)
    
    def test_get_current_futures(self):
        user = User(id=1, name='user1', weekly_money=100000)
        bet1 = Bet(amount=100, winnings = 200, bet_type = 'futures', user_id = user.id)
        bet2 = Bet(amount=400, winnings = 700, bet_type = 'futures', user_id = user.id)
        db.session.add(user)
        db.session.add_all([bet1, bet2])
        db.session.commit()

        response = self.client.get(f'/api/{user.id}/current-futures-bets')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data[0]['amount'], 100)
        self.assertEqual(data[1]['winnings'], 700)

    def test_post_current_futures(self):
        user = User(id = 1, name = 'user1', weekly_money=100000, futures_money = 2000)
        db.session.add(user)
        db.session.commit()
        new_bet_data = {'amount': 1000, 'bet_type': 'futures', 'odds': 240, 'user_id': 1}
        response = self.client.post(f'/api/{user.id}/current-futures-bets', data = json.dumps(new_bet_data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(user.futures_money, 1000)
        self.assertEqual(data['odds'], 240)

    def test_get_bet(self):
        user = User(id = 1, name='user1')
        bet1 = Bet(id=1, user_id=1, amount=100, winnings=2000)
        db.session.add(user)
        db.session.add(bet1)
        db.session.commit()
        response = self.client.get(f'/api/{user.id}/currentbet/{bet1.id}')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['amount'], 100)
        self.assertEqual(data['winnings'], 2000)

    def test_patch_bet(self):
        user = User(id=1, name='user1', money=2000)
        bet1 = Bet(id=1, user_id=1, amount=100, winnings=500)
        bet2 = Bet(id=2, user_id=1, amount=500, winnings=2000)
        db.session.add(user)
        db.session.add_all([bet1,bet2])
        db.session.commit()
        
        bet_data = {'hit':'hit'}
        response = self.client.patch(f'/api/{user.id}/currentbet/{bet1.id}', data=json.dumps(bet_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data=json.loads(response.data)
        self.assertEqual(user.money, 2500)
        self.assertEqual(data['hit'], 'hit')
        
        bet_data2 = {'hit':'push'}
        response2 = self.client.patch(f'/api/{user.id}/currentbet/{bet2.id}', data=json.dumps(bet_data2), content_type='application/json')
        self.assertEqual(response2.status_code, 200)
        data2 = json.loads(response2.data)
        self.assertEqual(user.money, 3000)
        self.assertEqual(data2['hit'], 'push')

    def test_delete_bet(self):
        user = User(id=1, name='user1', money=2000)
        bet = Bet(id=1, user_id=1, amount=100, winnings=200)
        db.session.add(user)
        db.session.add(bet)
        response = self.client.delete(f'/api/{user.id}/currentbet/{bet.id}')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['Delete'], 'You have successfully deleted this bet!')
        



if __name__ == '__main__':
    pytest.main()