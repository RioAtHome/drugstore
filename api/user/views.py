import csv
import os
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .store_csv import CSVFiles
from .models import User
from .serializers import UserSerializer
from user.serializers import MyTokenSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import APIException
from django.middleware import csrf


class ServiceUnavailable(APIException):
    status_code = 400
    default_detail = 'Service temporarily unavailable, try again later.'
    default_code = 'service_unavailable'




def return_picture_url(picture):
    # TODO: TAKES TOO GODDAMN LONG
    API_KEY = settings.PHOTO_STORAGE_API_KEY
    API_URL = settings.PHOTO_STORAGE_API_URL

    resp = requests.post(f'{API_URL}?key={"f0402fb8fb0aa5127952b1c548108dfe"}', files={'image': picture})
    if resp.status_code == 200:
        return resp.json()['data']['display_url']

    raise ServiceUnavailable()



class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer


class SignoutView(APIView):
    def get(self, request):
        return Response({"message": "User Signed out"}, status=status.HTTP_200_OK)


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, code):
        user = get_object_or_404(User, code=code)
        if request.user != user or not request.user.is_staff:
            return Response({"message": "only cannot get another user data"}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, code):
        if request.user != get_object_or_404(User, code=code):
            return Response({"message": "cannot update another user data"})

        if 'picture' in request.data:
            picture = request.FILES['picture']
            url = return_picture_url(picture)

            request.data['picture'] = url

        
        serializer = UserSerializer(request.user, request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            data = UserSerializer(request.user).data

            return Response(data, status=status.HTTP_200_OK)


class AddListUsers(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def list(self, request):
        if not request.user.is_staff:
            return Response({"message": "only staff user can get all users data"})
        return super().list(self, request)

    def create(self, request):
        users = User.objects.all()
        if request.user.is_staff:
            csv_file = CSVFiles(request).get_csv_file()

            admin_user = User.objects.filter(is_staff=True).first()
            User.objects.all().exclude(pk=admin_user.code).delete()

            with open(csv_file) as f_data:
                reader = csv.DictReader(f_data)
                exceptions = []
                for n, row in enumerate(reader, start=1):
                    data = {
                        "code": row["code"],
                        "name": row["name"],
                        "password": row["password"],
                        "latitude": row["latitude"],
                        "longitude": row["longitude"],
                        "picture": None,
                    }
                    serializer = UserSerializer(data=data)
                    if not serializer.is_valid():
                        error = {
                            "data": data,
                            "line": n,
                            "errors": serializer.errors,
                        }
                        exceptions.append(error)
                        continue
                    serializer.save()
                os.remove(csv_file)
                if exceptions:
                    return Response({"exceptions": exceptions})
            return Response(
                {"message": "the file data is uploaded successfully"},
                status=status.HTTP_201_CREATED,
            )
