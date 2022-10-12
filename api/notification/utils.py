from .serializers import NotificationSerializer


def create_notfication(data):
    """
    Takes in `data` as an argument which is a dict
    Dict keys are user and payload.
    user should be the user you want to notify
    and payload is the message.
    """
    serializer = NotificationSerializers(data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
