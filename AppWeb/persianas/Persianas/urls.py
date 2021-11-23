"""Persianas URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from applications.principal import urls as principal
from applications.productos import urls as productos
from applications.usuarios import urls as usuarios
from applications.ventas import urls as ventas
from .settings.base import MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(principal)),
    path('', include(productos)),
    path('', include(usuarios)),
    path('', include(ventas)),
] + static(MEDIA_URL, document_root = MEDIA_ROOT)
