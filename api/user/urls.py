from django.urls import path
from .views import MyTokenView, SignoutView, UserView, AddListUsers
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny

urlpatterns = [
    path("signin/", MyTokenView.as_view()),
    path("signout/", SignoutView.as_view()),
    path("<str:code>/", UserView.as_view()),
    path("", AddListUsers.as_view()),
    path("refresh/", authentication_classes([])(permission_classes([AllowAny])(TokenRefreshView)).as_view())
]

# authentication_classes([])(permission_classes([AllowAny])(some_view)).as_view()