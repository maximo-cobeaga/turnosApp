from django.contrib import admin
from .models import Categoria, Servicio, Prestador, Reserva, Bussines,Favoritos

# Register your models here.


class BussinesAdminModel(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'codigo_postal', 'latitud', 'categoria', 'direccion']


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['id','titulo']


class ServicioAdmin(admin.ModelAdmin):
    list_display = ['id','bussines', 'nombre', 'tiempo', 'precio']


class PrestadorAdmin(admin.ModelAdmin):
    list_display = ['id','bussines', 'nombre', 'apertura', 'cierre']


class ReservaAdmin(admin.ModelAdmin):
    list_display = ['id', 'prestador', 'servicio',  'fecha', 'hora', 'usuario']

class FavoritosAdmin(admin.ModelAdmin):
    list_display = ['id', 'usuario']


admin.site.register(Bussines, BussinesAdminModel)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Servicio, ServicioAdmin)
admin.site.register(Prestador, PrestadorAdmin)
admin.site.register(Reserva, ReservaAdmin)
admin.site.register(Favoritos, FavoritosAdmin)
