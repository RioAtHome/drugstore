from .models import Notification
from .serializers import NotificationSerializer
from .utils import create_token
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

class ListNotfications(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        pk = self.kwargs.get("user_pk")
        return Notification.objects.filter(user=pk)

class GenerateToken(APIView):
    def get(self, request, *args, **kwargs):
        # TODO: Create another type of token with a different signture so we can differentiate
        # between WS and HTTP Tokens
        pass
