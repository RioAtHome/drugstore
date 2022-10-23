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


def uploaded_file_to_dict(file):
    dict_list = []
    readable_file = file.read().decode().splitlines()
    csv_file = csv.DictReader(readable_file)

    for row in csv_file:
        cleaned_row = {k: v for k, v in row.items() if v}
        dict_list.append(cleaned_row)

    return dict_list


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
    staff_users = User.objects.filter(is_staff=True).values_list('code', flat=True)
    authentication_classes = [JWTAuthentication]
    queryset = User.objects.all().exclude(pk__in=staff_users)
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def list(self, request):
        if not request.user.is_staff:
            return Response({"message": "only staff user can get all users data"})
        return super().list(self, request)

    def create(self, request):
        users = User.objects.all()
        if not request.user.is_staff:
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)

        file = request.FILES['file']
        ext = file.name.split(".")[1]

        if not ext in ['csv']:
            return Response("Bad Extension honey", status=status.HTTP_400_BAD_REQUEST)

        customers = uploaded_file_to_dict(file)
        if not customers:
            return Response("Bad Syntax", status=status.HTTP_400_BAD_REQUEST)


        serializer = UserSerializer(data=customers, many=True)
        valid = serializer.is_valid()

        for error in serializer.errors:
            if error['code'][0].code != 'unique':
                return Response("Bad Syntax", status=status.HTTP_400_BAD_REQUEST)
        
        self.queryset.delete()
        
        serializer = UserSerializer(data=customers, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()


        return Response("A-Okay", status=status.HTTP_201_CREATED)
