from django.template.context_processors import request
from django.utils import timezone

from rest_framework import serializers
from .models import Reserva, Bussines, Servicio, Prestador, Favoritos


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


class ServicioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'tiempo', 'nombre', 'precio', 'bussines']

class PrestadoresSerializers(serializers.ModelSerializer):
    class Meta:
        model = Prestador
        fields = '__all__'

class ReservasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['bussines','servicio', 'prestador', 'fecha', 'hora', 'nota']
        extra_kwargs = {'usuario': {'read_only': True}}

    def validate(self, data):
        if Reserva.objects.filter(
                bussines=data['bussines'],
                prestador=data['prestador'],
                fecha=data['fecha'],
                hora=data['hora']
        ).exists():
            raise serializers.ValidationError("El turno ya existe, revisa tus reservas o elige otro turno")
        return  data

class ReservasSerializersByUser(serializers.ModelSerializer):
    bussines = BussinesSerializers()
    servicio = ServicioSerializers()
    prestador = PrestadoresSerializers()

    class Meta:
        model = Reserva
        fields = ['bussines','servicio', 'prestador', 'fecha', 'hora', 'nota']


class FavoritosSerializers(serializers.ModelSerializer):
    bussines = BussinesSerializers(many=True)

    class Meta:
        model = Favoritos
        fields = ['usuario', 'bussines']

 #class FavoritosSerializer(serializers.ModelSerializer):
 #    bussines = BussinesSerializers(many=True, read_only=True)
 #    bussines_ids = serializers.ListField(write_only=True, child=serializers.IntegerField())
 #
 #    class Meta:
 #        model = Favoritos
 #        fields = ['usuario', 'bussines', 'bussines_ids']
 #
 #    def update(self, instance, validated_data):
 #        bussines_ids = validated_data.get("bussines_ids", [])
 #        instance.bussines.set(Bussines.objects.filter(id__in=bussines_ids))
 #        instance.save()
 #        return instance