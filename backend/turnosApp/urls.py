from django.urls import re_path, path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    re_path('makeBook/', views.makeBook),
    re_path('getBooks/', views.getBooks),
    re_path('getBussines/', views.get_bussines),
    re_path('getFree/', views.getFree),
]
