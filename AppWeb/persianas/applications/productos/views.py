from django.shortcuts import render

# Create your views here.
def productos(request):
	return render(request, "productos/listProducts.html")

	
def categorias(request):
	context = {'object_list': Categoria.objects.all().order_by('name')}
	return render(request, "productos/listCategory.html", context)		
		
class curdcategorias(View):
	
	def get(self, request, *args, **kwargs):
		data = json.loads(request.GET.get('data'))
		type = data['type']
		arr = []
		actions = ['<a id="', """" class="table-action hover-danger" href="#" style="display: inline-block; float: right; color: white;" onclick="deleteCategory(this)"><i class="ti-trash"></i></a>
		<a id='""", """' class="table-action hover-primary" href="#" style="float: right; color: white;" data-toggle="modal" data-target="#edit-Brand" onclick="prepareEditCategory(this)" data='""", """'><i class="ti-pencil"></i></a>"""]
		if type == 'categorias':
			query = Categoria.objects.all()
		else:
			query = Subcategoria.objects.all()
		try:
			len(query)
			for x in query:
				if type == 'categorias':
					temp = [x.name, actions, x.id]
				else:
					temp = [x.name, x.categoria.name, actions, x.id, x.categoria_id]
				arr.append(temp)
		except:
			x = query
			if type == 'categorias':
				temp = [x.name, actions, x.id]
			else:
				temp = [x.name, x.categoria.name, actions, x.id, x.categoria_id]
			arr.append(temp)
		return HttpResponse(json.dumps({'data':arr, 'type': type}), content_type='application/json')
		
	def post(self, request, *args, **kwargs):
		data = json.loads(request.POST.get('data'))
		typerqs = data['type']
		type = data['data'].replace('í', 'i')
		if typerqs == 'new':
			message = 'La '+ data['data'] +' se registró con exito'
			if type == 'categoria':
				category = Categoria(name=data['name'])
				category.save()
			else:
				category = Categoria.objects.get(id=data['category'])
				subcategory = Subcategoria(name=data['name'])
				subcategory.categoria = category
				subcategory.save()
			return HttpResponse(json.dumps({'message': message, 'val': 5, 'id': category.id, 'name': data['name']}), content_type='application/json')
		elif typerqs == 'edit':
			message = 'Se realizó la edición con exito'
			if type == 'categoria':
				category = Categoria.objects.get(id=data['id'])
				category.name = data['name']
				category.save()
			else:
				subcategory = Subcategoria.objects.get(id=data['id'])
				subcategory.name = data['name']
				if data['category'] != str(subcategory.categoria_id):
					category = Categoria.objects.get(id=data['category'])
					subcategory.categoria = category
				subcategory.save()
			return HttpResponse(json.dumps({'message': message, 'val': 5}), content_type='application/json')
		elif typerqs == 'delete':
			message = 'Se eliminó con exito la ' + data['data']
			if type == 'categoria':
				category = Categoria.objects.get(id=data['id'])
				category.delete()
			else:
				subcategory = Subcategoria.objects.get(id=data['id'])
				subcategory.delete()
			return HttpResponse(json.dumps({'message': message, 'val': 5}), content_type='application/json')