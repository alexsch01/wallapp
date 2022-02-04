from .models import User
from rest_framework.test import APITestCase

user_data = {
    "username": "fakeuser",
    "first_name": "Fake",
    "last_name": "User",
    "email": "fake@user.com",
    "password": "pass"
}

class CreateUserTest(APITestCase):
    def test_can_create_user(self):
        response = self.client.post('/users/', user_data)
        self.assertEqual(response.status_code, 201)

class ViewUsersTest(APITestCase):
    def setUp(self):
        self.user = User(user_data)

    def test_can_view_user_list(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_can_view_user(self):
        response = self.client.get('/users/', args=[self.user.id])
        self.assertEqual(response.status_code, 200)
