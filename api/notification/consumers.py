import json
from .models import Notification, Online
from .serializers import NotificationSerializer
from django.db.utils import IntegrityError
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async


class NotificationConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def flip_to_seen(self, payload):
        noti_ids = [noti["id"] for noti in payload]
        queryset = Notification.objects.filter(pk__in=noti_ids)

        for instance in queryset:
            instance.mark_as_seen()

    @database_sync_to_async
    def remove_user_online(self, user):
        Online.objects.filter(user=user).delete()

    @database_sync_to_async
    def set_user_online(self, user):
        Online.objects.create(user=user)

    @database_sync_to_async
    def latest_notfication(self, user):
        notification = Notification.objects.filter(user=user)[:10]
        return NotificationSerializer(notification, many=True).data

    async def connect(self):
        self.user = self.scope["user"]

        # One user, one group
        self.user_room = str(self.user.pk)

        await self.channel_layer.group_add(self.user_room, self.channel_name)
        await self.accept()

        await self.set_user_online(self.user)

        notifications = await self.latest_notfication(self.user)
        payload = {"data": notifications}
        await self.notify(payload)

    async def notify(self, payload=None, type="notify"):
        """
        Responsible for 'notifying' the user that is associated with
        the channel group, and in this case, it's just one user.
        """
        await self.send(text_data=json.dumps(payload["data"]))
        await self.flip_to_seen(payload["data"])

    async def websocket_disconnect(self, message):
        """
        Called when the socket closes
        """
        await self.channel_layer.group_discard(self.user_room, self.channel_name)

        await self.remove_user_online(self.user)
        await super().websocket_disconnect(message)
