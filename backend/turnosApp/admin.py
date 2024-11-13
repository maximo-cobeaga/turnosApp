from django.contrib import admin
from .models import Categoria, Negocio, Servicio, Prestador, Sucursal, Usuario, Reserva

# Register your models here.


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['titulo']


class NegocioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'codigo_postal', 'categoria']


class SucursalAdmin(admin.ModelAdmin):
    list_display = ['negocio', 'direccion', 'apertura', 'cierre']


class ServicioAdmin(admin.ModelAdmin):
    list_display = ['sucursal', 'nombre', 'tiempo', 'precio']


class PrestadorAdmin(admin.ModelAdmin):
    list_display = ['sucursal', 'nombre', 'apertura', 'cierre']


class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['dni', 'nombre', 'nacimiento', 'mail', 'telefono']


class ReservaAdmin(admin.ModelAdmin):
    list_display = ['prestador',
                    'servicio',  'fecha', 'hora', 'usuario']


admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Negocio, NegocioAdmin)
admin.site.register(Sucursal, SucursalAdmin)
admin.site.register(Servicio, ServicioAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Prestador, PrestadorAdmin)
admin.site.register(Reserva, ReservaAdmin)
