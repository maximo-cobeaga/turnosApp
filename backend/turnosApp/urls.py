from django.urls import re_path, path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    re_path('makeBook/', views.makeBook),
    re_path('register/', views.register),
    re_path('logout/', views.log_out),
    re_path('profile/', views.profile),
    re_path('getBooks/', views.getBooks),
    re_path('getBussines/', views.get_bussines),
    re_path('getFree/', views.getFree),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
