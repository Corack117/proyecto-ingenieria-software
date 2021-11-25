from django.shortcuts import render
from django.views.generic import ListView
from django.http import HttpResponse
from .models import Cancelacion, Ventas
from applications.productos.models import *
import json
from datetime import datetime
import random
from django.core import serializers
import ast
from django.views import View

# Create your views here.

def agregarRegistroVentas():
    product = []
    for x in ([1, 2] if random.randint(1, 2)==1 else [1,]):
        product.append(Producto.objects.filter(id=x).first())
    products={}
    for x in product:
        quant = random.randint(1, 3)
        products[f"{x.id}"]={
            "price":x.price,
            "quantity": quant,
            # "total": ( x.price * quant ),
        }
    metadata = {
            "products":products,
            "address":{
                    "calle":"Av. San juan",
                    "colonia":"Las huertas",
                    "numeroExterior":"18",
                    "numeroInterior":"sn",
                    "entreCalle1":"calle spo",
                    "entreCalle2":"Av. Las palmas 1",
                    "municipioAlcaldia":"Naucalpan",
                    "estado":"México",
                    "cp":"53428",
                    "pais":"México",
                    "destinatario":"Alan",
                    "telefono":"5553467982",
                    "detallesDeEntrega":"Porton rojo, timbre 4, cuidado con el perro xd",
                },
            "methodPayment":{
                    "type":"Tarjeta",
                }
        }
    total=0
    for x in metadata["products"].values():
        total = total + float(x["price"]*x["quantity"])
        
    print(total)
    venta = Ventas(
        user=random.randint(1, 10),
        status=1,
        date= datetime.now(),
        metadata=metadata,
        total=total,
    )
    venta.save()
    for x in product:
        venta.product.add(x)

def agregarRegistroCancelaciones():
    reason = random.randint(1, 3)
    if reason == 3:
        reasonText="Me arrepenti en el ultimo instante :c"
    else:
        reasonText=""
    venta = Ventas.objects.filter(id=random.randint(1, 10)).first()
    cancelacion=Cancelacion(
        venta=venta,
        user=venta.user,
        admin=random.randint(1, 5),
        reason=reason,
        reasontext=reasonText,
        date=datetime.now(),
        status=1
    )
    cancelacion.save()

def getAllDataVenta():
    data=[]
    venta = Ventas.objects.all()
    # print(venta)
    buttonAddress = '<div style="margin-left:10px;margin-right:5px"><span title="Dirección" class="icon ti-location-pin buttonThModal"></span></div>'
    buttonRefCancelation = '<a href="/cancelaciones" style="margin-left:auto;"><span title="Cancelaciones" class="icon ti-pencil-alt buttonRefCancelation"></span></a>'
    buttonCancelPedido = '<div style="margin-left:auto;"><span title="Cancelar pedido" class="icon ti-face-sad buttonThChangeCancelStatus"></span></div>'
    for x in venta:
        buttonProduct = '<div style="margin-left:10px;"><span title="Productos" class="icon ti-package buttonThModalP"></span></div>'
        buttonChangeStatus = '<div style="margin-left:auto;"><span title="Editar" class="icon ti-pencil buttonThChangeStatus"></span></div>'
        metaAddress = ast.literal_eval(x.metadata['address'])
        user = User.objects.get(id=x.user)
        lastname = user.last_name.replace("/", " ")
        name = lastname + " " + user.first_name
        #Numero de pedido
        divIdVenta = f'<div idVenta={x.id} class="containerTdData" dataName="{name}"><div>{x.id}</div></div>'
        #Status
        divStatus = f'<div class="containerTdData"><div class="containerTdStatus">{x.get_status_display()}</div><div class="containerChangeButt"></div></div>'
        #Direccion
        address = f"{metaAddress['municipioAlcaldia']}, {metaAddress['estado']}"
        divAddress = f'<div class="containerTdData"> <div>{address}</div></div>'
        #Acciones
        # CASO. Si el status es cancelado no hay boton de edicion
        if (x.status == Ventas.CANCELADO or x.status == Ventas.ENTREGADO):
            buttonProduct = '<div style="margin-left:auto;"><span title="Productos" class="icon ti-package buttonThModalP"></span></div>'
            actions = f'<div class="containerTdData">{buttonProduct}{buttonAddress}</div>'
        # CASO. Si hay una cancelacion pendiente del pedido no se puede editar
        elif (Cancelacion.objects.filter(venta__id=x.id, status=Cancelacion.PENDIENTE)):
            actions = f'<div class="containerTdData  hasCancelation">{buttonRefCancelation}{buttonProduct}{buttonAddress}</div>'
        elif (x.status == Ventas.PENDIENTE):
            buttonChangeStatus = '<div style="margin-left:10px;"><span title="Editar" class="icon ti-pencil buttonThChangeStatus"></span></div>'
            actions = f'<div class="containerTdData">{buttonCancelPedido}{buttonChangeStatus}{buttonProduct}{buttonAddress}</div>'
        else:
            actions = f'<div class="containerTdData">{buttonChangeStatus}{buttonProduct}{buttonAddress}</div>'
        data.append([
            divIdVenta,
            x.user,
            divAddress,
            str(datetime.date(x.date)),
            divStatus,
            actions,
        ])
    
    return data

def getDataVentaByID(idVenta):
    venta = Ventas.objects.filter(id=idVenta).first()
    metaProducts = ast.literal_eval(venta.metadata['products'])
    #No.Venta
    dataVenta = {}
    for prod in venta.product.all():
        dataVenta[f"{prod.id}"] = {
            "name": prod.name,
            "price": metaProducts[f"{prod.id}"]["price"],
            "quantity": metaProducts[f"{prod.id}"]["quantity"],
            "sku": prod.sku,
        }
    return dataVenta

def getDataAddressByID(idVenta):
    venta = Ventas.objects.filter(id=idVenta).first()
    dataAddress = ast.literal_eval(venta.metadata['address'])
    return dataAddress

def getAllDataCancelacion(recibido):
    data=[]
    try:
        if int(recibido['status']) == 4:
            cancelacion = Cancelacion.objects.all()
        else:
            cancelacion = Cancelacion.objects.filter(status=recibido['status'])
    except:
        print('error1')
        return HttpResponse(json.dumps({'data': data}), content_type='application/json')
        
    buttonAddress = '<div style="margin-left:10px;margin-right:5px"><span title="Dirección" class="icon ti-location-pin buttonThModal"></span></div>'
    buttonChangeStatus = '<div style="margin-left:auto;"><span title="Editar" class="icon ti-pencil buttonThChangeStatus"></span></div>'
    for x in cancelacion:
        buttonProduct = '<div style="margin-left:10px;"><span title="Productos" class="icon ti-package buttonThModalP"></span></div>'
        
        metaAddress = ast.literal_eval(x.venta.metadata['address'])
        user = User.objects.get(id=x.user)
        lastname = user.last_name.replace("/", " ")
        name = lastname + " " + user.first_name
        
        divIdVenta = f'<div idVenta={x.venta.id} id="{x.id}" class="containerTdData" dataName="{name}"><div>{x.venta.id}</div></div>'
        #Status
        divStatus = f'<div class="containerTdData"><div class="containerTdStatus">{x.get_status_display()}</div><div class="containerChangeButt"></div></div>'
        #Direccion
        address = f"{metaAddress['municipioAlcaldia']}, {metaAddress['estado']}"
        divAddress = f'<div class="containerTdData"> <div>{address}</div><div style="margin-left:auto;"></div></div>'
        #Reason
        if x.reason==Cancelacion.ADMINCANCEL:
            reason = f"{x.get_reason_display()}: {x.reasontext}"
        else:    
            reason = (f"Otro: {x.reasontext}") if x.reason==Cancelacion.OTRO else x.get_reason_display()
        #Acciones
        # CASO. Si el status es denegado o aceptado no hay boton de edicion
        if (x.status == Cancelacion.ACEPTADO or x.status == Cancelacion.DENEGADO):
            buttonProduct = '<div style="margin-left:auto;"><span title="Productos" class="icon ti-package buttonThModalP"></span></div>'
            actions = f'<div class="containerTdData">{buttonProduct}{buttonAddress}</div>'
        elif (x.reason == Cancelacion.ADMINCANCEL):
            actions = f'<div class="containerTdData hasAdminCancel">{buttonChangeStatus}{buttonProduct}{buttonAddress}</div>'
        else:
            actions = f'<div class="containerTdData">{buttonChangeStatus}{buttonProduct}{buttonAddress}</div>'
        data.append([
            divIdVenta, 
            x.user, 
            divAddress, 
            reason, 
            str(datetime.date(x.date)),
            divStatus,
            actions
        ])
    return data

class VentasListView(ListView):
    model = Ventas
    # for i in range(25):
    #     agregarRegistroVentas()
    template_name = "ventas/listaVentas.html"

class searchVenta(View):
    def get(self, request, *args, **kwargs):   
        recibido = json.loads(request.GET.get('data'))
        data=[]
        if(recibido['type'] == 'getAll'):
            try:
                data=getAllDataVenta()
            except:
                print("error1")
            return HttpResponse(json.dumps({'data': data}), content_type='application/json')
        elif(recibido['type'] == 'getDataVenta'):
            try:
                dataVenta = getDataVentaByID(int(recibido['idVenta']))
            except:
                dataVenta = ''
            return HttpResponse(json.dumps({'data': dataVenta}), content_type='application/json')
        elif(recibido['type'] == 'getDataAddress'):
            try:
                dataVenta = getDataAddressByID(int(recibido['idVenta']))
            except:
                dataVenta = ''
            return HttpResponse(json.dumps({'data': dataVenta}), content_type='application/json')
        else:
            print('error')
            return HttpResponse(json.dumps({'data': []}), content_type='application/json')

    def post(self, request, *args, **kwargs):
        recibido = json.loads(request.POST.get('data'))
        if (recibido['type'] == "changeStatus"):
            idVenta = recibido["idVenta"]
            changeStatus = recibido["changeStatus"]
            venta = Ventas.objects.get(id=idVenta)
            venta.status = changeStatus
            venta.save() 
            data = "Cambio realizado correctamente"
        elif (recibido['type'] == "generateCancelRequest"):
            print(int(recibido["idVenta"]))
            idVenta = int(recibido["idVenta"])
            venta = Ventas.objects.get(id=idVenta)
            cancelation = Cancelacion(
                venta=venta,
                user=venta.user,
                admin=recibido["admin"],
                reason=Cancelacion.ADMINCANCEL,
                reasontext=recibido["reason"],
                date=datetime.now(),
                status=Cancelacion.PENDIENTE
            )
            cancelation.save()
            data = "Registro de cancelación generado correctamente"
        else:
            data = "Ocurrio un error"
            print('error')
        return HttpResponse(json.dumps({'data': data}), content_type='application/json')

def cancelaciones(request):
    # for i in range(5):
    #     agregarRegistroCancelaciones()
    return render(request, "cancelaciones/listaCancelacion.html")
    
class searchCancelacion(View):
    def get(self, request, *args, **kwargs):   
        recibido = json.loads(request.GET.get('data'))
        data=[]

        if(recibido['type'] == 'getCancelaciones'):
            try:
                data = getAllDataCancelacion(recibido)
            except:
                print("error1")
        else:
            print('error')
        
        return HttpResponse(json.dumps({'data': data}), content_type='application/json')

    def post(self, request, *args, **kwargs):
        recibido = json.loads(request.POST.get('data'))
        if (recibido['type'] == "changeStatus"):
            idVenta = recibido["idVenta"]
            idCancelacion = recibido["idCancelacion"]
            changeStatus = recibido["changeStatus"]
            if (int(changeStatus) == Cancelacion.ACEPTADO):
                venta = Ventas.objects.get(id=idVenta)
                venta.status = Ventas.CANCELADO
                venta.save()
            cancelacion=Cancelacion.objects.get(id=idCancelacion)
            cancelacion.status=changeStatus
            cancelacion.save()
            data = "Cambio realizado correctamente"
        else:
            data = "Ocurrio un error"
            print('error')
        return HttpResponse(json.dumps({'data': data}), content_type='application/json')

