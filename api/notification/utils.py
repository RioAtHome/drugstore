import jwt
from .serializers import NotificationSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings


def create_notfication(data):
    """
    Takes in `data` as an argument which is a dict
    Dict keys are user and payload.
    user should be the user you want to notify
    and payload is the message.
    """
    serializer = NotificationSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()


def create_token(payload):
    load = {
        "exp": settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        "iat": datetime.datetime.utcnow(),}

    load = {**payload, **load}
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    return token


def verify_token(token):
    try:
        payload = jwt.decode(token, settings.WS_SECRET_KEY, algorithms=["HS256"])
    except jwt.exceptions.DecodeError:
        raise AuthenticationFailed("Unauthenticated!")
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Token Expired")
    return payload