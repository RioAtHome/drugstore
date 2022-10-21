from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.


class User(AbstractUser):
    DEFAULT_PICTURE = 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'
    username = None
    code = models.CharField(max_length=5, primary_key=True, unique=True)
    name = models.CharField(max_length=50, default="Pharmacy Name")
    picture = models.URLField(max_length=255, null=True, blank=True, default=DEFAULT_PICTURE)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "code"
    objects = CustomUserManager()

    def __str__(self):
        return self.code
