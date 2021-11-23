$(document).ready(function(){
	$('#filterBn').click(applyFilter)
	$('#priceFilter').click(applyFilter)
	$('#inventaryFilter').click(applyFilter)
	$('#newProduct').click(prepareProduct)
	$('#new_Back').click(changeViewProduct)
	$('#new_Next').click(changeViewProduct)
	$('#edit_Back').click(changeViewProduct)
	$('#edit_Next').click(changeViewProduct)
	$('#new_Category').change(showSubcategory)
	$('#edit_Category').change(showSubcategory)
	$('#new_Discount, #edit_Discount').change((e) => {
		let val
		if(e.currentTarget.id.includes('new'))
			val = 'new'
		else 
			val = 'edit'
		if($('#'+val+'_Discount').is(':checked'))
			$('#'+val+'_Porcentage').parent().removeClass('hidePorcentage')
		else 
			$('#'+val+'_Porcentage').parent().addClass('hidePorcentage')
	})
	initializeDataTable();
});

const applyFilter = (e) => {
	let element = e.currentTarget
	if(element.id != 'filterBn') {
		let data = $(element).attr('data')
		$('#priceFilter').removeClass('active')
		$('#inventaryFilter').removeClass('active')
		$(element).addClass('active')
		$('#filter').attr('data', data)
		$('#minFilter').attr('placeholder', data + ' min...')
		$('#maxFilter').attr('placeholder', data + ' max...')
	}
	$('#example-1').DataTable().ajax.reload();
}

function initializeDataTable()
{
	// Setup - add a text input to each footer cell
	$('#example-1 tfoot th').each( function () {
		var title = $(this).text();
		$(this).html( '<input class="form-control" type="text" placeholder="Buscar '+title+'">' );
	});
	
	// DataTable
	var table = $('#example-1').DataTable({
		'ajax': {
		   url: "/productos/info",
		   type: "get",
		   data: function (data) {
			   let min = parseInt($('#minFilter').val().trim())
			   let max = parseInt($('#maxFilter').val().trim())
			   data = $('#filter').attr('data')
			   data = {data, min, max}
			   data = {data: JSON.stringify(data)}
			   return data
		   },
		   "dataSrc": function (json) {
			   $(json.data).each((position, value) => {
				   let actions = value[6][0] + value[7] + value[6][1] + value[7] + value[6][2] + value[8] + value[6][3] + value[6][4] + value[7] + value[6][5]
				   value[6] = actions
			   })
			   return json.data;
		   },
		},
		'scrollX': true,
		"drawCallback": function( settings ) {
			let rows
			rows = $('.waring_info[data="1"]').parent().parent()
			rows.css('background-color', 'rgba(255, 50, 0, 0.5)')
		}
	});
	
	// Apply the search
	table.columns().every( function () {
		var that = this;
		
		$( 'input', this.footer() ).on( 'keyup change', function () {
			 if ( that.search() !== this.value ) {
			   that.search( this.value ).draw();
			 }
		});
	});
	
	$('[placeholder="Buscar Acciones"]').prop( "disabled", true );
}

function initializeDropZone(val) 
{
	$('#'+val+'Dropzone').addClass('dropzone')
	$('#'+val+'Dropzone').dropzone({
		url: '/productos/info',
		autoProcessQueue: false,
		uploadMultiple: true,
		parallelUploads: 5,
		maxFiles: 5,
		maxFilesize: 2,
		acceptedFiles: 'image/*',
		addRemoveLinks: true,
		parasmName: 'images',
		headers: {
			'X-CSRFToken': $('[name="csrfmiddlewaretoken"]').val()
		},
		init: function() {
			dzClosure = this; // Makes sure that 'this' is understood inside the functions below.
			
			// for Dropzone to process the queue (instead of default form behavior):
			$('#'+val+'_Save').click((e) => {
				e.preventDefault();
				e.stopPropagation();
				// console.log(validateData(val))
				if(validateData(val))
					dzClosure.processQueue();
			});
			
			this.on("maxfilesexceeded", function(file){
				this.removeFile(file);
				return notification('No puedes subir mas de 5 imagenes', 2)
			});
			
			// send all the form data along with the files:
			this.on("sendingmultiple", function(data, xhr, formData) {
				let name = $('#'+val+'_Name').val()
				let inventory = $('#'+val+'_Inventory').val()
				let presentation = $('#'+val+'_Presentation').val()
				let price = $('#'+val+'_Price').val()
				let description = $('#'+val+'_Description').val()
				let brand = $('#'+val+'_Brand').val()
				let category = $('#'+val+'_Category').val()
				let subcategory = $('#'+val+'_Subcategory').val()
				let hasDiscount = $('#'+val+'_Discount').is(':checked')
				let hasPromo = $('#'+val+'_Promotion').is(':checked')
				let status = $('#'+val+'_Status').is(':checked')
				let cover = $('#'+val+'_coverPhoto')[0].files[0]
				let discount
				if(hasDiscount)
					discount = $('#'+val+'_Porcentage').val()
				else 
					discount = 0
				let id = $('#edit_Save').attr('data')
				formData.append('cover', cover)
				formData.append('data', JSON.stringify({
					type: val, id: id, name: name, inventory: inventory, presentation: presentation, price: price, description: description, brand: brand, subcategory: subcategory, hasDiscount: hasDiscount, discount: discount, hasPromo: hasPromo, status: status
				}));
			});
			
			this.on("errormultiple", function() {
				return notification('Error de comunicación, contactate con el administrador', 2)
			});
			
			this.on("successmultiple", function() {
				$('.close').trigger('click')
				$('#minFilter').val('')
				$('#maxFilter').val('')
				$('#example-1').DataTable().ajax.reload();
				if(val == 'new')
					return notification('El producto se registró con éxito', 5)
				else
					return notification('El producto se editó con éxito', 5)
			});
		}
	})
}

function validateData(val) 
{
	let name = $('#'+val+'_Name').val()
	let inventory = $('#'+val+'_Inventory').val()
	let presentation = $('#'+val+'_Presentation').val()
	let price = $('#'+val+'_Price').val()
	let description = $('#'+val+'_Description').val()
	let brand = $('#'+val+'_Brand').val()
	let category = $('#'+val+'_Category').val()
	let subcategory = $('#'+val+'_Subcategory').val()
	let hasDiscount = $('#'+val+'_Discount').is(':checked')
	let hasPromo = $('#'+val+'_Promotion').is(':checked')
	let status = $('#'+val+'_Status').is(':checked')
	let cover = $('#'+val+'_coverPhoto')[0].files[0]
	let discount
	if(hasDiscount)
		discount = $('#'+val+'_Porcentage').val()
	else 
		discount = 0
	let dropZone = Dropzone.instances[0]
	if(name.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo nombre no puede estar vacío', 2)
		return false
	}
	if(inventory.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo inventario no puede estar vacío', 2)
		return false
	}
	if(presentation.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo presentación no puede estar vacío', 2)
		return false
	}
	if(price.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo precio no puede estar vacío', 2)
		return false
	}
	if(description.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo descripción no puede estar vacío', 2)
		return false
	}
	if(brand == '')
	{
		notification('No se ha elegido una marca', 2)
		return false
	}
	if(category == '')
	{
		notification('No se ha elegido una categoría', 2)
		return false
	}
	if(subcategory == '')
	{
		notification('El campo subcategoría no puede estar vacío', 2)
		return false
	}
	if(hasDiscount && discount.replace(/(\s+|\n\r?)/g, '') == '')
	{
		notification('El campo porcentaje no puede estar vacío', 2)
		return false
	}
	if(!cover && val == 'new')
	{
		notification('No se ha asignado una foto de portada', 2)
		return false
	}
	if(dropZone.files.length == 0)
	{
		notification('No hay fotos para la galería', 2)
		return false
	}
	return true
}

// Sin uso por el momento
function descriptionEvaluate()
{
	Swal.fire({
		title: 'Advertencia',
		icon: 'question',
		html: '<h5>No hay una descripción asignada.</h5><br/><h6>¿Deseas continuar?</h6>',
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonText: 'Continuar',
		confirmButtonColor: 'red',
		iconColor: 'red',
		background: 'rgba(255, 255, 255, 0.85)',
	}).then((data) => {
		if(data.isConfirmed)
			return true
		else
			return false
	})
}

function prepareProduct(e) 
{
	let val
	if(e.id == null)
		val = 'new'
	else 
		val = 'edit'
	$('#'+val+'_Second').animate({
		maxHeight: 0,
		opacity: 0,
	})
	$('#'+val+'_Second').hide()
	$('#'+val+'_First').css({
		maxHeight: 1000,
		opacity: 1,
	})
	$('#'+val+'_First').show()
	$('#'+val+'_Back').css('opacity', '0')
	$('#'+val+'_Back').hide()
	$('#'+val+'_Cancel_Left').css('opacity', '0')
	$('#'+val+'_Cancel_Left').hide()
	$('#'+val+'_Cancel').css('opacity', '1')
	$('#'+val+'_Cancel').show()
	$('#'+val+'_Save').css('opacity', '0')
	$('#'+val+'_Save').hide()
	$('#'+val+'_Next').css('opacity', '1')
	$('#'+val+'_Next').show()
	$('[type="checkbox"]').prop('checked', false)
	$('#'+val+'_Porcentage').parent().addClass('hidePorcentage')
	$('#'+val+'-Product .modal-body').animate({
		scrollTop: 0
	}, 0);
	$('.dropify-clear').trigger('click')
	Dropzone.instances.forEach(dz => dz.destroy())
	initializeDropZone(val)
	if(val== 'new')
	{
		$('.form-group').removeClass('do-float')
		$('.form-group .form-control').val('')
		$('.dropify-message').css('display', 'block')
		$('.dropify-clear').css('display', 'none')
		$('.dropify-preview').css('display', 'none')
		$('.dropify-filename-inner').html('')
		$('.dropify-render').html('')
		$('#new_Brand').val('')
		$('#new_Brand').selectpicker('refresh');
		$('#new_Category').val('')
		$('#new_Category').selectpicker('refresh');
		$('#new_Subcategory').val('')
		$('#new_Subcategory').selectpicker('refresh');
	}
	else 
	{
		$('.form-group').addClass('do-float')
		$.post('/productos/info', {'data': JSON.stringify({
			type: 'infoE', id: e.id
		})}).done((data) => {
			$('#edit_Name').val(data.name)
			$('#edit_Inventory').val(data.inventory)
			$('#edit_Presentation').val(data.presentation)
			$('#edit_Price').val(data.price)
			$('#edit_Description').val(data.description)
			$('#edit_Brand').val(data.marca)
			$('#edit_Brand').selectpicker('refresh');
			if(!data.hasDiscount)
				$('#edit_Porcentage').parent().addClass('hidePorcentage')
			else
				$('#edit_Porcentage').parent().removeClass('hidePorcentage')
			$('#edit_Category').val(data.categoria)
			$('#edit_Category').selectpicker('refresh');
			showSubcategory('#edit_Category', data.subcategoria)
			// $('#edit_Subcategory').val(data.subcategoria);
			// $('#edit_Subcategory').selectpicker('refresh');
			$('#edit_Discount').prop('checked', data.hasDiscount)
			$('#edit_Promotion').prop('checked', data.hasPromo)
			$('#edit_Status').prop('checked', data.status)
			// let cover = $('#'+val+'_coverPhoto')[0].files[0]
			$('#edit_Porcentage').val(data.discount)
			$('#edit_Save').attr('data', e.id)
			let dropy = $('#edit_coverPhoto').dropify().data('dropify')
			dropy.destroy();
			dropy.settings.defaultFile = '/media/'+data.coverPhoto
			dropy.init();
			let dropZone = Dropzone.instances[0]
			// let a = { name: 'b6.png', size: 12345, type: 'image/jpeg', accepted: true, status: Dropzone.QUEUED};
			$(data.images).each(function (index, value) {
				let url = "/media/" + value.image	
				let name = value.image.replace("productos/gallery/", "");
				let mockFile = new File([""], name);
				mockFile.status = Dropzone.QUEUED;
				mockFile.accepted = true
				mockFile.upload = {filename: value.id};
				mockFile.height = 300;
				mockFile.width = 300;
				dropZone.emit('addedfile', mockFile);
				dropZone.emit('thumbnail', mockFile, url);
				dropZone.files.push(mockFile);
				let element = $(mockFile.previewElement)
				element.addClass('dz-complete');
				let info = element.find('.dz-size span')
				info.html('<strong>'+value.size+'</strong> '+value.infoUnit)
				// dropZone.emit("complete", mockFile);
			});
				dropZone._updateMaxFilesReachedClass();
		}).fail(() => {
			return notification('Error de comunicación, contactate con el administrador', 2)
		})
	}
}

function showSubcategory(e, val)
{
	let brand = $(e)
	if($(e).attr('id') == null)
		brand = $(this)
	$.post('/productos/info', {'data': JSON.stringify({ 
		type: 'info', brand: brand.val() 
	})}).done((data) => {
		$('#new_Subcategory').empty()
		$('#edit_Subcategory').empty()
		data.names.forEach((value) => {
			if(brand.attr('id') == $('#new_Category').attr('id'))
				$('#new_Subcategory').append('<option value="' + value[0] + '">' + value[1] + '</option>')
			else 
				$('#edit_Subcategory').append('<option value="' + value[0] + '">' + value[1] + '</option>')
		})
		if(brand.attr('id') == $('#new_Category').attr('id'))
			$('#new_Subcategory').selectpicker('refresh');
		else
		{
			$('#edit_Subcategory').val(val);
			$('#edit_Subcategory').selectpicker('refresh');
		}
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}
 
function changeViewProduct(e) 
{
	let val
	if(e.currentTarget.id.includes('new'))
		val = 'new'
	else if(e.currentTarget.id.includes('edit'))
		val = 'edit'
	if($('#'+val+'_First').is(":hidden"))
	{
		$('#'+val+'_Second').animate({
			maxHeight: 0,
			opacity: 0,
		}, 500, () => {
			$('#'+val+'_Second').hide()
			$('#'+val+'_First').show()
			$('#'+val+'_First').animate({
				maxHeight: 1000,
				opacity: 1,
			}, 500)
			$('#'+val+'_Save').hide()
			$('#'+val+'_Back').hide()
			$('#'+val+'_Cancel_Left').hide()
			$('#'+val+'_Cancel').show()
			$('#'+val+'_Cancel').animate({
				opacity: 1,
			}, 400)
			$('#'+val+'_Next').show()
			$('#'+val+'_Next').animate({
				opacity: 1,
			}, 400)
		})
		$('#'+val+'_Save, #'+val+'_Cancel_Left, #'+val+'_Back').animate({
			opacity: 0,
		}, 500)
	}
	else
	{
		$('#'+val+'_First').animate({
			maxHeight: 0,
			opacity: 0,
		}, 500, () => {
			$('#'+val+'_First').hide()
			$('#'+val+'_Second').show()
			$('#'+val+'_Second').animate({
				maxHeight: 1000,
				opacity: 1,
			}, 500)
			$('#'+val+'_Next').hide()
			$('#'+val+'_Cancel').hide()
			$('#'+val+'_Cancel_Left').show()
			$('#'+val+'_Cancel_Left').animate({
				opacity: 1,
			}, 400)
			$('#'+val+'_Back').show()
			$('#'+val+'_Back').animate({
				opacity: 1,
			}, 400)
			$('#'+val+'_Save').show()
			$('#'+val+'_Save').animate({
				opacity: 1,
			}, 400)
		})
		$('#'+val+'_Next, #'+val+'_Cancel').animate({
			opacity: 0,
		}, 500)
	}
	$('#'+val+'-Product .modal-body').animate({
		scrollTop: 0
	}, 0);
}

function deleteProduct(e) 
{
	let name = $(e).parent().parent().children()[1]
	name = $(name).html()
	let campo = '<h5>¿Estás seguro de eliminar el producto \''+name+'\'?</h5><br/><h6>Escribe la palabra \'Eliminar\' para confirmar</h6>'
	Swal.fire({
		title: 'Advertencia',
		icon: 'question',
		html: campo, 
		input: 'text',
		inputAttributes: {
			autocapitalize: 'off'
		},
		showCancelButton: true,
		reverseButtons: true,
		confirmButtonText: 'Eliminar',
		confirmButtonColor: 'red',
		iconColor: 'red',
		background: 'rgba(255, 255, 255, 0.85)',
		showLoaderOnConfirm: true,
		preConfirm: (text) => {
			if(text != 'Eliminar')
				return Swal.showValidationMessage('Validación incorrecta')
			return new Promise(function (resolve, reject){
				$.post('/productos/info', {'data': JSON.stringify({
					type: 'delete', id: e.id
				})}).done((data) => {
					$('.close').trigger('click')
					$('#example-1').DataTable().ajax.reload();
					resolve()
				}).fail(() => {
					reject()
				})
			})
			.catch(error => {
				Swal.showValidationMessage('Upps! Hubo un error, contactate con el administrador')
			});
		},
		allowOutsideClick: () => !Swal.isLoading()
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Se ha eliminado con éxito',
				icon: 'success',
				confirmButtonColor: '#c48b11',
				timer: 2000,
			})
		}
	})
}
// Un solo trago, 394 años de vida

function showInfoProduct(e) 
{
	$.post('/productos/info', {'data': JSON.stringify({
		type: 'infoE', id: e.id
	})}).done((data) => {
		$('#edit_Name').val(data.name)
		$('#edit_Inventory').val(data.inventory)
		$('#edit_Presentation').val(data.presentation)
		$('#edit_Price').val(data.price)
		$('#edit_Description').val(data.description)
		$('#edit_Brand').val(data.marca)
		$('#edit_Brand').selectpicker('refresh');
		if(data.marca)
			$('#edit_Porcentage').parent().addClass('hidePorcentage')
		else
			$('#edit_Porcentage').parent().removeClass('hidePorcentage')
		$('#edit_Category').val(data.categoria)
		$('#edit_Category').selectpicker('refresh');
		showSubcategory('#edit_Category', data.subcategoria)
		// $('#edit_Subcategory').val(data.subcategoria);
		// $('#edit_Subcategory').selectpicker('refresh');
		$('#edit_Discount').prop('checked', data.hasDiscount)
		$('#edit_Promotion').prop('checked', data.hasPromo)
		$('#edit_Status').prop('checked', data.status)
		// let cover = $('#'+val+'_coverPhoto')[0].files[0]
		$('#'+val+'_Porcentage').val(data.discount)
		$('#edit_Save').attr('data', e.id)
		let dropy = $('#edit_coverPhoto').dropify().data('dropify')
		dropy.destroy();
		dropy.settings.defaultFile = '/media/'+data.coverPhoto
		dropy.init();
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}