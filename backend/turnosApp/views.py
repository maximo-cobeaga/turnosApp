from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializers, ReservasSerializers, BussinesSerializers
from .models import Bussines, Reserva
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
    bussines = Bussines.objects.all()
    serializer = BussinesSerializers(bussines, many=True, context={'request': request})
    return Response({'bussines': serializer.data}, status=status.HTTP_200_OK)

# Gestion de usuarios

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializers(data=request.data)
    print(request.data)
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