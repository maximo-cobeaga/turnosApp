from rest_framework import serializers
from .models import  CustomUser
from django.utils import timezone


class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'nombre', 'apellido', 'telefono', 'nacimiento', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_nacimiento(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError('La fecha de nacimiento no puede ser futura')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
