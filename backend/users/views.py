from django.core.serializers import serialize
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.db import IntegrityError

from .models import CustomUser
from .serializers import CustomUserSerializers

# Create your views here.

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = CustomUser.objects.get(email=request.user.email)
    serializer = CustomUserSerializers(instance=user)
    return Response({'user': serializer.data})
