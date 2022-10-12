from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.generics import ListAPIView


class ListNotfications(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        pk = self.kwargs.get("user_pk")
        return Notification.objects.filter(user=pk)
