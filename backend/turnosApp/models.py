from django.db import models

# Create your models here.


class Categoria(models.Model):
    titulo = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.titulo


class Negocio(models.Model):
    nombre = models.CharField(max_length=150, null=False, blank=False)
    codigo_postal = models.IntegerField(null=False, blank=False)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, related_name='categorias', null=False, blank=False)

    def __str__(self):
        return self.nombre


class Sucursal(models.Model):
    direccion = models.CharField(max_length=150)
    apertura = models.TimeField(null=False, blank=False)
    cierre = models.TimeField(null=False, blank=False)
    negocio = models.ForeignKey(
        Negocio, on_delete=models.CASCADE, related_name='negocios', null=False, blank=False)

    def __str__(self):
        return self.direccion


class Servicio(models.Model):
    tiempo = models.IntegerField(null=False, blank=False)
    nombre = models.CharField(max_length=50, null=False, blank=False)
    precio = models.FloatField(null=False, blank=False)
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.CASCADE, related_name='servicios', null=False, blank=False)

    def __str__(self):
        return self.nombre


class Prestador(models.Model):
    nombre = models.CharField(max_length=50, blank=False, null=False)
    apertura = models.TimeField(null=False, blank=False)
    cierre = models.TimeField(null=False, blank=False)
    sucursal = models.ForeignKey(
        Sucursal, on_delete=models.CASCADE, related_name='prestadores', null=False, blank=False)

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
        related_name='servicios_res', null=False, blank=False)
    prestador = models.ForeignKey(
        Prestador, on_delete=models.CASCADE, related_name='prestadores_res', null=False, blank=False)
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE,
        related_name='usuarios_res', null=False, blank=False)
    fecha = models.DateField(null=False, blank=False)
    hora = models.TimeField(null=False, blank=False)
    nota = models.CharField(max_length=200, null=True, blank=True)
