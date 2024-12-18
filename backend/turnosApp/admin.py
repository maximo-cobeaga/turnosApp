from django.contrib import admin
from .models import Categoria, Servicio, Prestador, Reserva, Bussines

# Register your models here.


class BussinesAdminModel(admin.ModelAdmin):
    list_display = ['nombre', 'codigo_postal', 'categoria', 'direccion']


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['titulo']


class ServicioAdmin(admin.ModelAdmin):
    list_display = ['bussines', 'nombre', 'tiempo', 'precio']


class PrestadorAdmin(admin.ModelAdmin):
    list_display = ['bussines', 'nombre', 'apertura', 'cierre']


class ReservaAdmin(admin.ModelAdmin):
    list_display = ['prestador',
                    'servicio',  'fecha', 'hora', 'usuario']


admin.site.register(Bussines, BussinesAdminModel)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Servicio, ServicioAdmin)
admin.site.register(Prestador, PrestadorAdmin)
admin.site.register(Reserva, ReservaAdmin)
