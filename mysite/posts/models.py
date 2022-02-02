from django.db import models

# Create your models here.
class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=60)
    content = models.CharField(max_length=500)
    username = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title