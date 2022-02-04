from .models import Post
from rest_framework.test import APITestCase

post_data = {
    "title": "Fake Title",
    "content": "Fake message",
    "username": "fakeuser"
}

class CreatePostTest(APITestCase):
    def test_can_create_post(self):
        response = self.client.post('/posts/', post_data)
        self.assertEqual(response.status_code, 201)

class ViewPostsTest(APITestCase):
    def setUp(self):
        self.post = Post(post_data)

    def test_can_view_post_list(self):
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, 200)

    def test_can_view_user(self):
        response = self.client.get('/posts/', args=[self.post.id])
        self.assertEqual(response.status_code, 200)
