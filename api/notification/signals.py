from .models import Notification, Online
from django.db.models import signals
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .serializers import NotificationSerializer


def send_notification(instance):
    data = NotificationSerializer(instance).data
    layer = get_channel_layer()
    async_to_sync(layer.group_send)(
        str(instance.user.pk), {"type": "notify", "data": [data]}
    )


@receiver(signals.post_save, sender=Notification)
def notify_users(sender, instance, created, **kwargs):
    """
    This function is called whenever a new entry to the model gets saved
    using Model.save() method.
    In this case Notification.save()
    """
    online = Online.objects.filter(user=instance.user).first()

    if instance.seen:
        return

    if online:
        send_notification(instance)
    return
