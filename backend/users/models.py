from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.core.validators import RegexValidator

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