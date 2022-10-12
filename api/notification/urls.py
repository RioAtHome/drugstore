from django.urls import path
from .views import ListNotfications

urlpatterns = [
    path("<str:user_pk>", ListNotfications.as_view()),
]
