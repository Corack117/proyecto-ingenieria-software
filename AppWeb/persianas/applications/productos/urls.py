from django.contrib.auth.decorators import login_required
from django.contrib import admin
from django.urls import path
from . import views as vw

urlpatterns = [
	path('productos/', vw.productos),
	path('productos/info', vw.curdproductos.as_view()),
]