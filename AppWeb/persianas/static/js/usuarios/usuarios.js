const peticiones = requestCustomerPersianas();

$(document).ready(function(){
	$('#new_Save').click(newCustomer);
	$('#newProduct').click(prepareProduct);
	$('#new_Back').click(changeViewProduct);
	$('#new_Next').click(changeViewProduct);

	$('#edit_Back').click(changeViewProduct);
	$('#edit_Next').click(changeViewProduct);
	$('#edit_Save').click(updateCustomer);
	initializeDataTable();
});

const actionsFunction = (id) => {
	return `<a id="${id}" class="table-action hover-danger" href="#" style="display: inline-block; float: right; color: white;" onclick="deleteProduct(this)">
		<i class="ti-trash"></i>
	</a>
	<a id="${id}" class="table-action hover-primary waring_info"
	   href="#" style="float: right; color: white;"
	   data-toggle="modal" data-target="#edit-Product" onclick="prepareProduct(this)" data="${id}">
		<i class="ti-pencil"></i>
	</a>
	<a id="${id}" class="table-action hover-primary" href="#" style="float: left; color: white;" onclick="openModal(this)">
		<i class="fal fa-info-square"></i>
	</a>`
}

const imgPreview = (src) => {
	return `<div class="no-gutters" data-provide="photoswipe">
				<img class="cursor-pointer" style="max-height: 100px;" src="${src}" alt="Imagen de perfil">
			</div>`
}

const initializeDataTable = () => {
	// Setup - add a text input to each footer cell
	$('#example-1 tfoot th').each( function () {
		var title = $(this).text();
		$(this).html( '<input class="form-control" type="text" placeholder="Buscar '+title+'">' );
	});
	
	// DataTable
	var table = $('#example-1').DataTable({
		'ajax': {
		   url: "/clientes/crud/",
		   type: "get",
		   "dataSrc": function (json) {
				$(json.data).each((position, value) => {
					value[0] = imgPreview(value[0]);
					value[5] = actionsFunction(value[6]);
				});
			   return json.data;
		   },
		},
		'scrollX': true,
		// "drawCallback": function( settings ) {
		// 	let rows
		// 	rows = $('.waring_info[data="1"]').parent().parent()
		// 	// rows.css('background-color', 'rgba(255, 50, 0, 0.5)')
		// }
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

const validateData = (val) => {
	let name = $('#'+val+'_Name').val()
	let flname = $('#'+val+'_fLastName').val()
	let slname = $('#'+val+'_sLastName').val()
	let email = $('#'+val+'_Email').val()
	let password = $('#'+val+'_Password').val()
	let rpassword = $('#'+val+'_rPassword').val()
	
	if(name.trim() == '') {
		notification('El campo Nombre no puede estar vac??o', 2)
		return false
	}
	if(flname.trim() == '') {
		notification('El campo Apellido Paterno no puede estar vac??o', 2)
		return false
	}
	if(slname.trim() == '') {
		notification('El campo Apellido Materno no puede estar vac??o', 2)
		return false
	}
	if(email.trim() == '') {
		notification('El campo Email no puede estar vac??o', 2)
		return false
	}
	if(!validateEmail(email)){
		notification('Formato de correo incorrecto', 2)
		return false
	}
	if(password == '') {
		notification('El campo Constrase??a no puede estar vac??o', 2)
		return false
	}
	if(password != rpassword) {
		notification('Las contrase??as no coinciden', 2)
		return false
	}
	return true
}

const prepareProduct = (e) => {
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
	$('#'+val+'-Product .modal-body').animate({
		scrollTop: 0
	}, 0);
	$('[type="checkbox"]').prop('checked', false)
	$('.dropify-clear').trigger('click')
	if(val== 'new')
	{
		$('.form-group').removeClass('do-float')
		$('.form-group .form-control').val('')
		$('.dropify-message').css('display', 'block')
		$('.dropify-clear').css('display', 'none')
		$('.dropify-preview').css('display', 'none')
		$('.dropify-filename-inner').html('')
		$('.dropify-render').html('')
	}
	else 
	{
		$('.form-group').addClass('do-float')
		let dataSend = {
			'data': JSON.stringify( { id: e.id } ),
			'type': 'info'
		}
		peticiones.post(dataSend).done((data) => {
			$('#edit_Name').val(data.name);
			$('#edit_fLastName').val(data.flastName);
			$('#edit_sLastName').val(data.slastName);
			$('#edit_Email').val(data.email);
			$('#edit_IsActive').prop('checked',data.isActive);
			$('#edit_Save').attr('data', e.id);
			let dropy = $('#edit_userPhoto').dropify().data('dropify')
			dropy.destroy();
			dropy.settings.defaultFile = '/media/'+data.profilePhoto
			dropy.init();
		}).fail(() => {
			return notification('Error de comunicaci??n, contactate con el administrador', 2)
		})
	}
}

const newCustomer = () => {
	if(!validateData('new'))
		return
	let name = $('#new_Name').val().trim();
	let flastName = $('#new_fLastName').val().trim();
	let slastName = $('#new_sLastName').val().trim();
	let lastName = flastName + '/' +slastName;
	let email = $('#new_Email').val().trim();
	let password = $('#new_Password').val();
	let img = $('#new_userPhoto')[0].files[0];
	let dataSend = { name, lastName, email, password }
		
	const form = new FormData();
	form.append('data',JSON.stringify(dataSend));
	form.append('type','new');
	form.append('profilePhoto',img);
	peticiones.postwImage(form).done(data => {
		$('#example-1').DataTable().ajax.reload();
		$('#new_Cancel').click();
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicaci??n, contactate con el administrador', 2)
	})
}

const updateCustomer = (e) => {
	if(!validateData('edit'))
		return
	const id = $(e.currentTarget).attr('data');
	let name = $('#edit_Name').val().trim();
	let flastName = $('#edit_fLastName').val().trim();
	let slastName = $('#edit_sLastName').val().trim();
	let lastName = flastName + '/' + slastName;
	let email = $('#edit_Email').val().trim();
	let isActive = $('#edit_IsActive').prop('checked');
	let img = $('#edit_userPhoto')[0].files[0];
	let dataSend = { id, name, lastName, email, isActive };
	
	const form = new FormData();
	form.append('data',JSON.stringify(dataSend));
	form.append('type','update');
	form.append('profilePhoto', img);
	peticiones.postwImage(form).done(data => {
		$('#example-1').DataTable().ajax.reload();
		$('#edit_Cancel').click();
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicaci??n, contactate con el administrador', 2)
	})
}

const changeViewProduct = (e) => {
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
	let campo = '<h5>??Est??s seguro de eliminar la imagen y dar de baja el cliente \''+name+'\'?</h5><br/><h6>Escribe la palabra \'Baja\' para confirmar</h6>'
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
		confirmButtonText: 'Confirmar',
		confirmButtonColor: 'red',
		iconColor: 'red',
		background: 'rgba(255, 255, 255, 0.85)',
		showLoaderOnConfirm: true,
		preConfirm: (text) => {
			if(text != 'Baja')
				return Swal.showValidationMessage('Validaci??n incorrecta')
			return new Promise(function (resolve, reject){
				let dataSend = {
					data: JSON.stringify({
						id: e.id
					}),
					type: 'delete'
				}
				peticiones.post(dataSend)
				.done((data) => {
					$('.close').trigger('click')
					$('#example-1').DataTable().destroy()
					initializeDataTable()
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
				title: 'Se ha dado de baja con ??xito',
				icon: 'success',
				confirmButtonColor: '#c48b11',
				timer: 2000,
			})
		}
	})
}