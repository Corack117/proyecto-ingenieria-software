from django.contrib.auth.decorators import login_required
from django.contrib import admin
from django.urls import path
from . import views as vw

urlpatterns = [
	path('productos/', vw.productos),
	path('categorias/', vw.categorias),
    path('categorias/info', vw.curdcategorias.as_view())
]