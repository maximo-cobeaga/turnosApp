from datetime import timezone

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Reserva, Bussines, CustomUser


class BussinesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bussines
        fields = ['id', 'nombre', 'codigo_postal', 'categoria', 'direccion']


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']


class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'nombre', 'apellido', 'telefono', 'nacimiento', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_nacimiento(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError('La fecha de nacimiento no puede ser futura')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nombre', 'apellido', 'email', 'numero', 'nacimiento','password')


class ReservasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['servicio', 'prestador', 'usuario', 'fecha', 'hora', 'nota']
