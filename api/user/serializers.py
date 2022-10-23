from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("code", "name", "password", "latitude", "longitude", "picture")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(
            code=validated_data["code"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if (password):
            validated_data.pop('password')
            instance.set_password(password)
            instance.save()

        return super().update(instance, validated_data)


class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["is_staff"] = user.is_staff
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = User.objects.filter(code=attrs["code"]).first()
        pharmacy_data = {
            "code": user.code,
            "name": user.name,
            "latitude": user.latitude,
            "longitude": user.longitude,
            "picture": user.picture,
            "is_staff": user.is_staff,
        }
        context = {
            "access": data["access"],
            "refresh": data["refresh"],
            "pharmacy": pharmacy_data,
        }

        return context


