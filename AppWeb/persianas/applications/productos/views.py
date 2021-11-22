from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.list import ListView
from django.views import View
from os import remove
from .models import *
import json


# Create your views here.
def productos(request):
	context = {
		'object_list': Marca.objects.all().order_by('name'),
		'object_category': Categoria.objects.all().order_by('name')
	}
	return render(request, "productos/listProducts.html", context)
	
class curdproductos(View):
	
	def get(self, request, *args, **kwargs):
		arr = []
		actions = ['<a id="', """" class="table-action hover-danger" href="#" style="display: inline-block; float: right; color: white;" onclick="deleteProduct(this)"><i class="ti-trash"></i></a>
		<a id='""", """' class="table-action hover-primary waring_info" href="#" style="float: right; color: white;" data-toggle="modal" data-target="#edit-Product" onclick="prepareProduct(this)" data='""", """'><i class="ti-pencil"></i></a>""", "<a id='", """' class="table-action hover-primary" href="#" style="float: left; color: white;" onclick="openModal(this)"><i class="fal fa-info-square"></i></a>"""]
		data = json.loads(request.GET.get('data'))
		info, min, max = data.values()
		if info == 'Precio':
			if data['min'] != None and data['max'] != None:
				query = Producto.objects.filter(price__range=(min, max))
			elif data['min'] != None and data['max'] == None:
				query = Producto.objects.filter(price__gte=min)
			elif data['min'] == None and data['max'] != None:
				query = Producto.objects.filter(price__lte=max)
			else:
				query = Producto.objects.all()
		else:
			if data['min'] != None and data['max'] != None:
				query = Producto.objects.filter(inventory__range=(min, max))
			elif data['min'] != None and data['max'] == None:
				query = Producto.objects.filter(inventory__gte=min)
			elif data['min'] == None and data['max'] != None:
				query = Producto.objects.filter(inventory__lte=max)
			else:
				query = Producto.objects.all()
			
		try:
			len(query)
			for x in query:
				waring = 0 if len(x.subcategoria.all()) != 0 else 1
				status = 'Activo' if x.status else 'Inactivo'
				temp = [x.sku, x.name, x.marca.name, '$'+str(x.price), status, x.inventory, actions, x.id, waring]
				arr.append(temp)
		except:
			x = query
			waring = 0 if len(x.subcategoria.all()) != 0 != None else 1
			status = 'Activo' if x.status else 'Inactivo'
			temp = [x.sku, x.name, x.marca.name, '$'+str(x.price), status, x.inventory, actions, x.id, waring]
			arr.append(temp)
		return HttpResponse(json.dumps({'data':arr}), content_type='application/json')
		
	def post(self, request, *args, **kwargs):
		gallery = []
		cover = request.FILES.get('cover')
		for key, file in request.FILES.items():
			if key != 'cover':
				gallery.append(file)
		data = json.loads(request.POST.get('data'))
		typerqs = data['type']
		if typerqs == 'new':
			subcategoria = Subcategoria.objects.get(id=data['subcategory'])
			brand = Marca.objects.get(id=data['brand'])
			product = Producto(name=data['name'], description=data['description'], presentation=data['presentation'], price=data['price'], coverPhoto=cover, marca=brand, status=data['status'], hasDiscount=data['hasDiscount'], hasPromo=data['hasPromo'], discount=data['discount'], inventory=data['inventory'])
			product.save()
			product.subcategoria.add(subcategoria)
			product.sku = product.id
			product.save()
			for each_image in gallery:
				image_obj = PostImages()
				image_obj.producto = product
				image_obj.image = each_image
				image_obj.save()
			return HttpResponse(json.dumps({'message': 'asd'}), content_type='application/json')
		if typerqs == 'edit':
			subcategoria = Subcategoria.objects.get(id=data['subcategory'])
			brand = Marca.objects.get(id=data['brand'])
			product = Producto.objects.get(id=data['id'])
			product.name = data['name']
			product.description = data['description']
			product.presentation = data['presentation']
			product.price = data['price']
			product.status = data['status']
			product.hasDiscount = data['hasDiscount']
			product.hasPromo = data['hasPromo']
			product.discount = data['discount']
			product.inventory = data['inventory']
			if subcategoria.id != data['subcategory']:
				subcategoria = product.subcategoria.all()
				try:
					product.subcategoria.remove(subcategoria[0])
				except:
					print('None subcategory')
				subcategoria = Subcategoria.objects.get(id=data['subcategory'])
				product.subcategoria.add(subcategoria)
			if cover != None:
				if product.coverPhoto: 
					remove(product.coverPhoto.path)
				product.coverPhoto = cover
			product.save()
			galleryTemp = []
			newGallery = []
			for image in gallery:
				try:
					galleryTemp.append(int(image.name))
				except:
					newGallery.append(image)
			galleryOld = PostImages.objects.filter(producto=product).exclude(id__in=galleryTemp)
			for image in galleryOld:
				remove(image.image.path)
				image.delete()
			for each_image in newGallery:
				image_obj = PostImages()
				image_obj.producto = product
				image_obj.image = each_image
				image_obj.save()
			return HttpResponse(json.dumps({'message': 'asd'}), content_type='application/json')
		elif typerqs == 'info':
			subcategory = Subcategoria.objects.filter(categoria_id=data["brand"])
			namesList = [[x.id, x.name] for x in subcategory]
			return HttpResponse(json.dumps({'names': namesList}), content_type='application/json')
		elif typerqs == 'infoE':
			product = Producto.objects.get(id=data["id"])
			subInfo = ''
			catInfo = ''
			if len(product.subcategoria.all()) > 0:
				category = product.subcategoria.all()[0].categoria_id
				subcategory = product.subcategoria.all()[0].id
				subInfo = product.subcategoria.all()[0].name
				catInfo = product.subcategoria.all()[0].categoria.name
			else:
				category = -1
				subcategory = -1
			gallery = PostImages.objects.filter(producto_id=data['id'])
			images = []
			for image in gallery:
				size = round(image.image.size/(1024*1024), 1)
				infoUnit = 'MB'
				if size == 0:
					size = round(image.image.size/(1024))
					infoUnit = 'KB'
				images.append({'id': image.id, 'image': str(image.image), 'size': size, 'infoUnit': infoUnit})
			dict = {'name': product.name, 'description': product.description, 'presentation': product.presentation, 'sku': product.sku, 'price': str(product.price), 'coverPhoto': product.coverPhoto.name, 'marca': product.marca.id, 'status': product.status, 'hasDiscount': product.hasDiscount, 'hasPromo': product.hasPromo, 'discount': product.discount, 'inventory': product.inventory, 'categoria': category, 'subcategoria': subcategory, 'images': images, 'subInfo': subInfo, 'catInfo': catInfo, 'marcaInfo': product.marca.name}
			return HttpResponse(json.dumps(dict), content_type='application/json')
		elif typerqs == 'delete':
			product = Producto.objects.get(id=data["id"])
			subcategoria = product.subcategoria.all()
			product.subcategoria.remove(subcategoria[0])
			if product.coverPhoto: 
				remove(product.coverPhoto.path)
			gallery = PostImages.objects.filter(producto=product)
			for image in gallery:
				remove(image.image.path)
			product.delete()
			return HttpResponse(json.dumps({}), content_type='application/json')

def marcas(request):
	return render(request, "productos/listBrands.html")		
		
class curdmarcas(View):
	
	def get(self, request, *args, **kwargs):
		arr = []
		actions = ['<a id="', """" class="table-action hover-danger" href="#" style="display: inline-block; float: right; color: white;" onclick="deleteBrand(this)"><i class="ti-trash"></i></a>
		<a id='""", """' class="table-action hover-primary" href="#" style="float: right; color: white;" data-toggle="modal" data-target="#edit-Brand" onclick="prepareEditBrand(this)"><i class="ti-pencil"></i>"""]
		query = Marca.objects.all()
		try:
			len(query)
			for x in query:
				temp = [x.name, actions, x.id]
				arr.append(temp)
		except:
			x = query
			temp = [x.name, actions, x.id]
			arr.append(temp)
		return HttpResponse(json.dumps({'data':arr}), content_type='application/json')
		
	def post(self, request, *args, **kwargs):
		data = json.loads(request.POST.get('data'))
		typerqs = data['type']
		if typerqs == 'new':
			brand = Marca(name=data['brand'])
			brand.save()
			return HttpResponse(json.dumps({'message': 'La marca se registró con exito', 'val': 5}), content_type='application/json')
		elif typerqs == 'edit':
			brand = Marca.objects.get(id=data['id'])
			brand.name = data['brand']
			brand.save()
			return HttpResponse(json.dumps({'message': 'Se realizó la edición con exito', 'val': 5}), content_type='application/json')
		elif typerqs == 'delete':
			brand = Marca.objects.get(id=data['id'])
			brand.delete()
			return HttpResponse(json.dumps({'message': 'Se eliminó con exito la marca', 'val': 5}), content_type='application/json')
