from django.contrib.auth.decorators import login_required
from django.contrib import admin
from . import views as vw
from django.urls import path, include


urlpatterns = [
	path('productos/', vw.productos),
	path('marcas/', vw.marcas),
    path('marcas/info', vw.curdmarcas.as_view()),
	path('categorias/', vw.categorias),
    path('categorias/info', vw.curdcategorias.as_view())
	path('productos/info', vw.curdproductos.as_view()),
]