from rest_framework_simplejwt.views import (
TokenObtainPairView, TokenRefreshView
)
from django.urls import re_path, path
from . import  views


urlpatterns = [
    re_path('register/', views.register),
    re_path('logout/', views.log_out),
    re_path('profile/', views.profile),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]