from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
	path('administradores/', views.AdminListView.as_view()),
    path('administradores/crud/', views.AdminViews.as_view()),
    path('clientes/', views.CustomerListView.as_view()),
    path('clientes/crud/', views.CustomerViews.as_view()),
]