from django.contrib import admin
from .models import Categoria, Servicio, Prestador, Reserva, Bussines, CustomUser

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

class CustomUserAdmin(admin.ModelAdmin):

    model = CustomUser
    list_display = ('email', 'nombre', 'apellido', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'nombre', 'apellido')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información Personal', {'fields': ('nombre', 'apellido', 'telefono', 'nacimiento')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'apellido', 'telefono', 'nacimiento', 'password', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Bussines, BussinesAdminModel)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Servicio, ServicioAdmin)
admin.site.register(Prestador, PrestadorAdmin)
admin.site.register(Reserva, ReservaAdmin)
