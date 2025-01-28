from datetime import timedelta, datetime

from django.core.serializers import serialize
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializers, BussinesSerializers, ServicioSerializers, ReservasSerializers, \
    PrestadoresSerializers, ReservasSerializersByUser
from .models import Bussines, Reserva, Servicio, Prestador
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

# Gestion de usuarios

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializers(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({'Error': 'El email ya esta en uso'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': 'Ocurrio un error inesperado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"user": request.data}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def log_out(request):
    try:
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'Message': 'Cierre de sesion exitoso'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def profile(request):
    user = CustomUserSerializers(data=request.data)
    return Response




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





















