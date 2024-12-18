from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Categoria(models.Model):
    titulo = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.titulo


class Bussines(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    codigo_postal = models.IntegerField(null=False, blank=False)
    categoria = models.ForeignKey(
        Categoria, related_name='bussines', on_delete=models.CASCADE, null=False, blank=False)
    direccion = models.CharField(max_length=150)

    def __str__(self):
        return self.titulo


class Servicio(models.Model):
    tiempo = models.IntegerField(null=False, blank=False)
    nombre = models.CharField(max_length=50, null=False, blank=False)
    precio = models.FloatField(null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, on_delete=models.CASCADE, related_name='servicios')

    def __str__(self):
        return self.nombre


class Prestador(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=False)
    apertura = models.TimeField(null=False, blank=False)
    cierre = models.TimeField(null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, on_delete=models.CASCADE, related_name='prestadores', null=True, blank=True)

    def __str__(self):
        return self.nombre


class Usuario(models.Model):
    dni = models.IntegerField(unique=True, primary_key=True)
    nombre = models.CharField(max_length=60)
    mail = models.EmailField()
    nacimiento = models.DateField()
    telefono = models.IntegerField()

    def __str__(self):
        return str(self.dni) + ' ' + self.nombre


class Reserva(models.Model):
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE,
        related_name='reser_servicio', null=False, blank=False)
    prestador = models.ForeignKey(
        Prestador, on_delete=models.CASCADE, related_name='reser_prestador', null=False, blank=False)
    bussines = models.ForeignKey(
        Bussines, related_name='reservas', on_delete=models.CASCADE, null=True, blank=True)
    usuario = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='reser_usuario', null=False, blank=False)
    fecha = models.DateField(null=False, blank=False)
    hora = models.TimeField(null=False, blank=False)
    nota = models.CharField(max_length=200, null=True, blank=True)
