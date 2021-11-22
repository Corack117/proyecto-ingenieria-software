from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
# from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from django.views import View
from threading import Timer
from .models import *
import datetime
import locale
import json

# Create your views here.
def timeout():
	print("Game over")
	seconds = 60; minute = 60; hour = 24; days = 7;
	# Semana completa
	t = Timer(seconds * minute * hour * days, timeout)
	t.start()
	
#Login_Logout
def login_superUser(request):
	user = (request.POST['user']).strip()
	password = (request.POST['password']).strip()
	user = authenticate(request, username=user, password=password)
	if user is not None:
		first_login = False
		if user.last_login == None:
			first_login = True
		login(request, user)
		# makeLogs(request,0)
		return HttpResponse(json.dumps({'status': True, 'firstTime': first_login}), content_type='application/json')
	else:
		return HttpResponse(json.dumps({'status': False, 'message': 'El usuario o contraseña es incorrecto.'}), content_type='application/json')

# Cerrar sesión
def logout_superUSer(request):
	# makeLogs(request,1)
	logout(request)
	return(HttpResponseRedirect('/'))

# Registro de logueos
def makeLogs(request,tp,userdest = None):
	add = 0
	listdesc = ['inició sesión.','cerró sesión.']
	ip = get_ip_address(request)
	userAgent = request.META.get('HTTP_USER_AGENT')
	userobj = User.objects.get(id = request.user.id)
	descc = 'El usuario '+ userobj.email + ' ' + listdesc[tp]
	newlog = registros(cuenta = userobj, dirIP = ip, uAgent = userAgent, desc = descc, intdef = tp)
	newlog.save()
	return 

# Obtener IP
def get_ip_address(request):
	x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')    ### Real IP address of client Machine
	return ip