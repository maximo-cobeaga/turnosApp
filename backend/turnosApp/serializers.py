from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Reserva, Bussines


class BussinesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bussines
        fields = ['id', 'nombre', 'codigo_postal', 'categoria', 'direccion']


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']


class ReservasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['servicio', 'prestador', 'usuario', 'fecha', 'hora', 'nota']
