from django.conf import settings
from django.db import models
import requests
from django.db.models import OneToOneField
from dotenv import load_dotenv
import os

load_dotenv()


# Create your models here.

class Categoria(models.Model):
    titulo = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.titulo


class Bussines(models.Model):
    DoesNotExist = None
    nombre = models.CharField(max_length=100, null=False, blank=False)
    image = models.ImageField(upload_to='bussines_pic', default='bussimes_pic/default.jpg')
    codigo_postal = models.IntegerField(null=False, blank=False)
    categoria = models.ForeignKey(
        Categoria, related_name='bussines', on_delete=models.CASCADE, null=False, blank=False)
    direccion = models.CharField(max_length=150)
    latitud = models.FloatField(default=0)
    longitud = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        key = os.getenv('MAP_KEY')
        dir_format = self.direccion.replace(' ', '+')
        response = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={dir_format}&key={key}')
        if response.status_code == 200:
            location = response.json()['results'][0]['geometry']['location']
            self.longitud = location['lng']
            self.latitud = location['lat']


        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre




class Prestador(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=False)
    apertura = models.TimeField(null=False, blank=False)
    cierre = models.TimeField(null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, on_delete=models.CASCADE, related_name='prestadores', null=True, blank=True)


    def __str__(self):
        return f'{self.nombre} ({self.bussines})'

class Servicio(models.Model):
    tiempo = models.IntegerField(null=False, blank=False)
    nombre = models.CharField(max_length=50, null=False, blank=False)
    precio = models.FloatField(null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, on_delete=models.CASCADE, related_name='servicios')
    prestadores = models.ManyToManyField(Prestador, related_name='servicios')

    def __str__(self):
        return self.nombre


class Reserva(models.Model):
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE,
        related_name='reser_servicio', null=False, blank=False)
    prestador = models.ForeignKey(
        Prestador, on_delete=models.CASCADE, related_name='reser_prestador', null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, related_name='reservas', on_delete=models.CASCADE, null=True, blank=True)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='reser_usuario', null=False, blank=False)
    fecha = models.DateField(null=False, blank=False)
    hora = models.TimeField(null=False, blank=False)
    nota = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['bussines','prestador', 'fecha','hora'], name='unique_time')
        ]
        ordering=['fecha', 'hora']

class Favoritos(models.Model):
    usuario = OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favoritos')
    bussines = models.ManyToManyField(Bussines, related_name='usuario_favoritos', blank=False)
