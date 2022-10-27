from django.conf import settings
from channels.db import database_sync_to_async
from django.core.exceptions import ImproperlyConfigured
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs
from rest_framework_simplejwt.exceptions import InvalidToken
from .utils import verify_token


USER_MODEL = get_user_model()


@database_sync_to_async
def get_user(pk):
    return get_object_or_404(USER_MODEL, pk=pk)


class JWTMiddleware:
    """
    This Middleware takes care of getting the token from the query parameter
    of the WS connection and find the user that is associated with
    said token, which then wraps the user object with the scope of the WS connection.
    """

    def __init__(self, app):
        self.SIMPLE_JWT_SETTINGS = getattr(settings, "SIMPLE_JWT", None)
        if not self.SIMPLE_JWT_SETTINGS:
            msg = (
                "rest_framework_simplejwt settings dont seem to be available, "
                "please check if SIMPLE_JWT settings are in your settings file"
            )

            raise ImproperlyConfigured(msg)

        self.USER_CLAIM = self.SIMPLE_JWT_SETTINGS["USER_ID_CLAIM"]

        self.app = app

    async def __call__(self, scope, receive, send):
        query_params = scope["query_string"].decode("utf8")

        try:
            token = parse_qs(query_params)["token"][0]
        except KeyError:
            raise InvalidToken()

        decoded_token = verify_token(token)

        try:
            user = await get_user(decoded_token[self.USER_CLAIM])
        except KeyError:
            msg = "Token do not fit server settings"
            raise InvalidToken(msg)

        scope["user"] = user

        return await self.app(scope, receive, send)
