import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from notification.middleware import JWTMiddleware


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DrugStore.settings")

http_app = get_asgi_application()

import notification.routing

application = ProtocolTypeRouter(
    {
        "http": http_app,
        "websocket": AllowedHostsOriginValidator(
            JWTMiddleware(URLRouter(notification.routing.websocket_urlpatterns))
        ),
    }
)
