from django.shortcuts import render
from django.http.response import HttpResponse
from django.contrib.auth.models import User
from django.views.generic import (
    ListView,
    View
)
from os import remove
from .models import *

import json
from ast import literal_eval
# Create your views here.

class AdminListView(ListView):
    model = Customer
    template_name = "usuarios/listAdmin.html"

class AdminViews(View):
    def get(self, request, *args, **kwargs):
        arr = []
        actions = []
        query = Admin.objects.all()
        for x in query:
            customer = Customer.objects.get(user = x.user)
            photo = customer.photo
            name = x.user.last_name.replace('/', ' ') + ' ' + x.user.first_name
            temp = [photo.url, name, customer.user.email, '', customer.id]
            arr.append(temp)
        return HttpResponse(json.dumps({'data':arr}), content_type='application/json')
    
    def post(self, request, *args, **kwargs):
        data = json.loads(request.POST['data'])
        typeMove = request.POST['type']
        if typeMove == 'new':
            newUser=User.objects.get(username=data['email'])
            newUser.is_superuser = True
            newUser.save()
            newAdmin = Admin(
                user = newUser
            )
            newAdmin.save()
            return HttpResponse(json.dumps({}), content_type='application/json')
        elif typeMove == 'delete':
            admin = Admin.objects.get(user_id=data['id'])
            admin.user.is_superuser = False
            admin.user.save()
            admin.delete()
            return HttpResponse(json.dumps({'data':''}), content_type='application/json')
        return HttpResponse(json.dumps({'data':''}), content_type='application/json')

class CustomerListView(ListView):
    model = Customer
    template_name = "usuarios/listUser.html"

class CustomerViews(View):
    def get(self, request, *args, **kwargs):
        # arr = [['sdgsgdsg','Drake Redfield', 'drake.redfield@hotmail.com','Verificado','Activo','',13]]
        arr = []
        actions = []
        query = Customer.objects.all()
        for x in query:
            # waring = 0 if len(x.subcategoria.all()) != 0 else 1
            status = 'Sin verificar' if x.verificado == 0 else ( 'Verificado' if x.verificado == 1 else 'Rechazado')
            isActive = 'Activo' if x.user.is_active else 'Inactivo'
            name = x.user.last_name.replace('/', ' ') + ' ' + x.user.first_name
            temp = [x.photo.url, name, x.user.email, status, isActive, '', x.id]
            arr.append(temp)
        return HttpResponse(json.dumps({'data':arr}), content_type='application/json')
    
    def post(self, request, *args, **kwargs):
        data = json.loads(request.POST['data'])
        typeMove = request.POST['type']
        if typeMove == 'new':
            try:
                newUser= User.objects.get(username=data['email'])
                message = 'Ya existe un usuario con ese correo electrónico'
                super = False
                if newUser.is_superuser:
                    super = True
                return HttpResponse(json.dumps({'message': message, 'val': 2, 'superuser': super}), content_type='application/json')
            except:
                newUser = User.objects.create_user(
                    username = data['email'],
                    email = data['email'],
                    last_name = data['lastName'],
                    first_name = data['name'],
                    password = data['password']
                )
                newUser.save()
            photo = request.FILES.get('profilePhoto')
            if photo == None:
                photo = 'default_pictures/default.png'
            newCustomer = Customer(
                user = newUser,
                photo = photo
            )
            newCustomer.save()
            return HttpResponse(json.dumps({'message':'El cliente se registró con éxito', 'val': 5}), content_type='application/json')
        elif typeMove == 'info':
            customer = Customer.objects.get(id = data['id'])
            flastName, slastName = customer.user.last_name.split('/')
            dataSend = {
                'name': customer.user.first_name,
                'flastName': flastName,
                'slastName': slastName,
                'email': customer.user.email,
                'isActive': customer.user.is_active,
                'profilePhoto': customer.photo.name
            }
            return HttpResponse(json.dumps(dataSend), content_type='application/json')
        elif typeMove == 'update':
            customer = Customer.objects.get(id = data['id'])
            try:
                if customer.user.username == data['email']:
                    User.objects.get(username = 0)
                temp = User.objects.get(username = data['email'])
                message = 'Ya existe un usuario con ese correo electrónico'
                super = False
                return HttpResponse(json.dumps({'message': message, 'val': 2}), content_type='application/json')
            except:
                customer.user.username = data['email']
                customer.user.first_name = data['name']
                customer.user.last_name = data['lastName']
                customer.user.email = data['email']
                customer.user.is_active = data['isActive']
                photo = request.FILES.get('profilePhoto')
                if photo != None:
                    if 'default_pictures' not in customer.photo.path:
                        remove(customer.photo.path)
                    customer.photo = photo
                customer.user.save()
                customer.save()
                dataSend = {
                    'message':'El cliente se actualizó con éxito', 
                    'val': 5,
                    'status': True,
                    'code': 200
                }
            return HttpResponse(json.dumps(dataSend), content_type='application/json')
        elif typeMove == 'delete':
            customer = Customer.objects.get(id = data['id'])
            if not customer.user.is_superuser:
                if 'default_pictures' not in customer.photo.path:
                    remove(customer.photo.path)
                customer.photo = 'default_pictures/default.png'
                customer.user.is_active = False
                customer.user.save()
                customer.save()
            return HttpResponse(json.dumps({'data':''}), content_type='application/json')
        return HttpResponse(json.dumps({'data':''}), content_type='application/json')