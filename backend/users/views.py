from lib2to3.fixes.fix_input import context

from django.core.serializers import serialize
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.db import IntegrityError
from django.http import request as req

from .models import CustomUser, EmailConfirmationToken
from .utils import send_email_confirmation_token
from .serializers import CustomUserSerializers

# Create your views here.

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializers(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')

        if CustomUser.objects.filter(email=email).exists():
            return Response({"Error", "El email ya esta en uso"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = serializer.save()
            token = EmailConfirmationToken.objects.create(usuario=user)
            send_email_confirmation_token(email=user, token_id=token.id)
            return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({'Error': 'El email ya esta en uso'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error': 'Ocurrio un error inesperado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"user": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def emailToken(request):
    usuario = request.user
    token, created = EmailConfirmationToken.objects.get_or_create(usuario=usuario)
    send_email_confirmation_token(email=usuario.email, token_id=token.id, user_id=usuario.id)
    return Response({"tk": token.id, "email":usuario.email})


def confirm_email_view(req):
    token_id = req.GET.get('token_id', None)
    try:
        token = EmailConfirmationToken.objects.get(id=token_id)
        user = token.usuario
        user.is_active = True
        user.save()
        data = {'is_confirm': True}
        token.delete()

        return render(req, template_name='confirmar_email.html', context=data)

    except EmailConfirmationToken.DoesNotExist:
        data = {'is_confirm': False}
        return render(req, template_name='confirmar_email.html', context=data)


