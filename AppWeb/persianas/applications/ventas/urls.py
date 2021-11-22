from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from . import views

urlpatterns = [

    url('pedidos/',views.VentasListView.as_view()),
    url('searchVenta/',views.searchVenta.as_view()),
    url('cancelaciones/',views.cancelaciones),
    url('searchCancelacion/',views.searchCancelacion.as_view()),
	
]