from django.template.context_processors import request
from django.utils import timezone

from rest_framework import serializers
from .models import Reserva, Bussines, CustomUser, Servicio, Prestador


# Usurios
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



# Logica de negocios

class BussinesSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = Bussines
        fields = ['id', 'nombre', 'latitud','longitud','codigo_postal', 'categoria', 'direccion', 'image']


class ReservasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['servicio', 'prestador', 'usuario', 'fecha', 'hora', 'nota']

class ServicioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'tiempo', 'nombre', 'precio', 'bussines']

class PrestadoresSerializers(serializers.ModelSerializer):
    class Meta:
        model = Prestador
        fields = '__all__'