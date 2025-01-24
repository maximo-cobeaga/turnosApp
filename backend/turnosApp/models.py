from django.utils import timezone
from django.core.validators import RegexValidator
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import requests

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, nombre, apellido, telefono, nacimiento, password, **other_fields):
        if not email:
            raise ValueError('El email es requerido')

        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, apellido=apellido, telefono=telefono, nacimiento=nacimiento, **other_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, nombre, apellido, telefono, nacimiento, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('El superuserser debe tener is_staff true')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('El superuserser debe tener is_superuser true')

        return self.create_user(email, nombre, apellido, telefono, nacimiento, password, **other_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    telefono = models.CharField(max_length=30,
    validators=[
        RegexValidator(r'^\+?1?\d{9,15}$', message='Número de teléfono inválido')
    ],)
    nacimiento = models.DateField()
    registro = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'telefono', 'nacimiento']

    def __str__(self):
        return f'{self.nombre} {self.apellido}'

    def has_perm(self, perm, obj=None):
        """Define si el usuario tiene un permiso específico."""
        return True

    def has_module_perms(self, app_label):
        """Define si el usuario tiene permisos para acceder a una aplicación específica."""
        return True



class Categoria(models.Model):
    titulo = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.titulo


class Bussines(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    image = models.ImageField(upload_to='bussines_pic', default='bussimes_pic/default.jpg')
    codigo_postal = models.IntegerField(null=False, blank=False)
    categoria = models.ForeignKey(
        Categoria, related_name='bussines', on_delete=models.CASCADE, null=False, blank=False)
    direccion = models.CharField(max_length=150)
    latitud = models.FloatField(default=0)
    longitud = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        key = 'AIzaSyAuAytAMqDEqaxiD07qxQt1fsfjMRhkSIU'
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
