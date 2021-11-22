$(document).ready(function(){
	$('#newBrand').click(prepareNewBrand)
	$('#new_Save').click(newBrand)
	$('#edit_Save').click(editBrand)
	initializeDataTable();
});

function initializeDataTable()
{
	$('#header_column').html('Marcas')
	$('#footer_column').html('Marcas')
	$('#header_column').next().html('Acciones')
	$('#footer_column').next().html('Acciones')
	// Setup - add a text input to each footer cell
	$('#example-1 tfoot th').each( function () {
		var title = $(this).text();
		$(this).html( '<input class="form-control" type="text" placeholder="Buscar '+title+'">' );
	});
	
	// DataTable
	var table = $('#example-1').DataTable({
		'ajax': {
		   url: "/marcas/info",
		   type: "get",
		   "dataSrc": function (json) {
			   $(json.data).each((position, value) => {
				  let actions =value[1][0] + value[2] + value[1][1] + value[2] + value[1][2]
				  value[1] = actions
			   })
			   return json.data;
		   } 
		},
		'scrollX': true,
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

function prepareNewBrand() 
{
	$('#new_Name').val('')
	$('.form-group').removeClass('do-float')
}

function newBrand() 
{
	let brand = $('#new_Name').val()
	if(brand.replace(/(\s+|\n\r?)/g, '') == '')
		return notification('El campo marca no puede estar vacío', 2)
	$.post('/marcas/info', {'data': JSON.stringify({
		type: 'new', brand: brand
	})}).done((data) => {
		$('.close').trigger('click')
		$('#example-1').DataTable().destroy()
		initializeDataTable()
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function prepareEditBrand(e) 
{
	let brand = $(e).parent().prev().html()
	$('#edit_Name').val(brand)
	$('#edit_Save').attr('data', e.id)
	$('.form-group').addClass('do-float')
}

function editBrand() 
{
	let brand = $('#edit_Name').val()
	let id = $('#edit_Save').attr('data')
	console.log(brand, id)
	if(brand.replace(/(\s+|\n\r?)/g, '') == '')
		return notification('El campo marca no puede estar vacío', 2)
	$.post('/marcas/info', {'data': JSON.stringify({
		type: 'edit', id: id, brand: brand
	})}).done((data) => {
		$('.close').trigger('click')
		$('#example-1').DataTable().destroy()
		initializeDataTable()
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function deleteBrand(e) 
{
	let brand = $(e).parent().prev().html()
	let campo = '<h5>¿Estás seguro de eliminar la marca \''+brand+'\'?</h5><br/><h6>Escribe la palabra \'Eliminar\' para confirmar</h6>'
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
				$.post('/marcas/info', {'data': JSON.stringify({
					type: 'delete', id: e.id
				})}).done((data) => {
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
				title: 'Se ha eliminado con éxito',
				icon: 'success',
				confirmButtonColor: '#c48b11',
				timer: 2000,
			})
		}
	})
}