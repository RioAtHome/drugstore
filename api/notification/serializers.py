from .models import Notification
from rest_framework import serializers


class NotificationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.name', read_only=True)
    class Meta:
        model = Notification
        fields = ["id", "user", "username", "payload", "seen", "created_at"]
