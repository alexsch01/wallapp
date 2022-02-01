from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=70)
    
    def __str__(self):
        return self.username