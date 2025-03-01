from datetime import timedelta, datetime
from idlelib.iomenu import errors
from winreg import REG_EXPAND_SZ

from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import  BussinesSerializers, ServicioSerializers, ReservasSerializers, \
    PrestadoresSerializers, ReservasSerializersByUser, FavoritosSerializers
from .models import Bussines, Reserva, Servicio, Prestador, Favoritos


# Create your views here.

# Logica de negocios

@api_view(['GET'])
def prueba(request):
    return Response({'data': 'the request has succesfuly'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_books(request):
    user = request.user
    reservas = Reserva.objects.filter(usuario=user)
    serializer = ReservasSerializers(reservas, many=True)
    return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bussines(request):
    id = request.query_params.get('id')
    if id:
        bussines = Bussines.objects.get(pk=id)
        servicios = Servicio.objects.filter(bussines=id)

        serializerBussines = BussinesSerializers(instance=bussines, many=False, context={'request': request})
        serilizerServicios = ServicioSerializers(instance=servicios, many=True, context={'request': request})

        return Response({
            'bussines': serializerBussines.data,
            'servicios': serilizerServicios.data
        }, status=status.HTTP_200_OK)
    else:
        bussines = Bussines.objects.all()
        serializer = BussinesSerializers(bussines, many=True, context={'request': request})
        return Response({'bussines': serializer.data}, status=status.HTTP_200_OK)



def calcular_turnos_por_prestador(horario_inicio, horario_fin, duracion_servicio, reservas_ocupadas):
    turnos_disponibles = []
    actual = horario_inicio

    while actual + duracion_servicio <= horario_fin:
        hora_inicio = actual.time()
        hora_fin = (actual + duracion_servicio).time()

        # Verifica si el intervalo esta ocupado
        ocupado = any(hora_inicio <= res < hora_fin for res in reservas_ocupadas)
        if not ocupado:
            turnos_disponibles.append(hora_inicio.strftime('%H:%M'))

        actual += duracion_servicio

    return turnos_disponibles




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFree(request):
    fecha = request.query_params.get('fecha')
    bussines_id = request.query_params.get('bussines')
    servicio_id = request.query_params.get('servicio')


    if not(fecha and bussines_id and servicio_id):
        return Response({"Error": "Parametros faltantes"})

    try:
        dataServicio = Servicio.objects.get(pk=servicio_id)

        dataReservas = Reserva.objects.filter(bussines=bussines_id, fecha=fecha)
        reservas_serializer = ReservasSerializers(instance=dataReservas, many=True)

        dataPrestadores = Prestador.objects.filter(bussines=bussines_id)
        prestadores_serializer = PrestadoresSerializers(instance=dataPrestadores, many=True)

        disponibilidad = []
        duracion_servicio = timedelta(minutes=dataServicio.tiempo)

        for prestador in prestadores_serializer.data:
            horario_inicio = datetime.strptime(prestador['apertura'], "%H:%M:%S")
            horario_fin = datetime.strptime(prestador['cierre'], "%H:%M:%S")

            reservas_ocupadas = [
                datetime.strptime(reserva['hora'], "%H:%M:%S").time()
                for reserva in reservas_serializer.data if reserva['prestador'] == prestador['id']
            ]

            turnos = calcular_turnos_por_prestador(horario_inicio, horario_fin, duracion_servicio, reservas_ocupadas)
            disponibilidad.append({
                'id': prestador['id'],
                "prestador": prestador["nombre"],
                "data": turnos
            })

        return Response({'disponibilidad': disponibilidad, 'servicio': ServicioSerializers(dataServicio).data}, status=status.HTTP_200_OK)


    except Servicio.DoesNotExist:
        return Response({"Error": "El servicio no existe"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBooks(request):
    user = request.user
    books = Reserva.objects.filter(usuario=user.id).order_by('fecha')
    serializer = ReservasSerializersByUser(instance=books, many=True, context={'request': request})
    return Response({'email': user.email, 'books': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def makeBook(request):
    serializer = ReservasSerializers(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save(usuario=request.user)
            return Response({'Success':'Su reserva se realizo con exito'}, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response({"Error": "La reserva ya existe"},
                            status=status.HTTP_400_BAD_REQUEST)
    return Response({'Error': serializer.errors}, status={status.HTTP_400_BAD_REQUEST})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_favoritos(request):
    try:
        favoritos= Favoritos.objects.get(usuario=request.user)
        serializer = FavoritosSerializers(instance=favoritos, context={'request': request})
        return Response({"Favortios": serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def agregar_favoritos(request):
    try:
        usuario= request.user
        print(request.data)
        bussines_id = request.data.get("bussines_id")

        if not bussines_id:
            return Response({"Error": "Se requierre el ID del negocio"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bussines = Bussines.objects.get(id=bussines_id)
        except bussines.DoesNotExist:
            return Response({"Error", "El negocio no existe"}, status=status.HTTP_404_NOT_FOUND)

        favoritos, created = Favoritos.objects.get_or_create(usuario=usuario)

        if favoritos.bussines.filter(id=bussines_id).exists():
            return Response({"Mensaje": "El negocio ya esta en favoritos"}, status=status.HTTP_200_OK)

        favoritos.bussines.add(bussines)
        favoritos.save()

        return Response({"Mensaje": "El negocion se agrego a favoritos"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def quita_favoritos(request):
    try:
        usuario = request.user
        bussines_id = request.data.get("bussines_id")

        if not bussines_id:
            return Response({"Error", "El bussines ID es necesario"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bussines = Bussines.objects.get(id=bussines_id)
        except ObjectDoesNotExist:
            return Response({"Error": "El bussines no existe"}, status=status.HTTP_404_NOT_FOUND)

        favoritos, created = Favoritos.objects.get_or_create(usuario=usuario)

        if not favoritos.bussines.filter(id=bussines_id).exists():
            return Response({"Error": "El bussines no se encuentra en favoritos"}, status=status.HTTP_400_BAD_REQUEST)

        favoritos.bussines.remove(bussines)
        favoritos.save()

        return Response({"Mensaje": "El negocio se removio de la lista de favoritos"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




