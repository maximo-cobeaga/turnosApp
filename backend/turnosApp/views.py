from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


from .serializers import UserSerializers, ReservasSerializers, BussinesSerializers
from .models import Bussines, Reserva
# Create your views here.

# User


@api_view(['POST'])
def register(request):
    serializer = UserSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()

    return Response({"user": request.data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def log_out(request):
    user = UserSerializers(data=request.data)
    return Response


@api_view(['POST'])
def profile(request):
    user = UserSerializers(data=request.data)
    return Response


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
    print(request)
    bussines = Bussines.objects.all()
    serializer = BussinesSerializers(bussines, many=True)
    return Response({'bussines': serializer.data}, status=status.HTTP_200_OK)
