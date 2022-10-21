from django.urls import path
from .views import MyTokenView, SignoutView, UserView, AddListUsers
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("signin/", MyTokenView.as_view()),
    path("signout/", SignoutView.as_view()),
    path("<str:code>/", UserView.as_view()),
    path("", AddListUsers.as_view()),
    path("refresh/", TokenRefreshView.as_view())
]
