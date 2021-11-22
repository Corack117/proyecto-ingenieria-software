$(document).ready(function(){
	$('#category').click(changeTable)
	$('#subcategory').click(changeTable)
	$('#newCategory').click(prepareNewCategory)
	$('#new_Save').click(newCategory)
	$('#edit_Save').click(editCategory)
	initializeDataTable('categorias')
});

function initializeDataTable(data)
{
	// Setup - add a text input to each footer cell
	$('#example-1 tfoot th').each( function () {
		var title = $(this).text();
		$(this).html( '<input class="form-control" type="text" placeholder="Buscar '+title+'">' );
	});
	// DataTable
	var table = $('#example-1').DataTable({
		'ajax': {
		   url: "/categorias/info",
		   type: "get",
		   data: {'data': JSON.stringify({type: data})},
		   "dataSrc": function (json) {
			   $(json.data).each((position, value) => {
				   let actions
				   if(json.type == 'categorias')
				   {
					   actions = value[1][0] + value[2] + value[1][1] + value[2] + value[1][2] + value[2] + value[1][3]
					   value[1] = actions
				   }
				   else
				   {
					   actions = value[2][0] + value[3] + value[2][1] + value[3] + value[2][2] + value[4] + value[2][3]
					   value[2] = actions
				   }
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

function changeTable() 
{
	let nameTable 
	let acciones = 'Acciones'
	let data = $(this).attr('data')
	$('.changeViewButton').removeClass('active')
	$(this).addClass('active')
	$('#example-1').DataTable().clear()
	$('#example-1').DataTable().destroy()
	if(data == 'categorias')
	{
		$('.title_modal').html('Categoría')
		$('#new_Name').next().html('Categoría')
		$('#edit_Name').next().html('Categoría')
		$('#header_temp').remove()
		$('#footer_temp').remove()
		$('#header_column').html('Categoría')
		$('#footer_column').html('Categoría')
		$('#header_column').next().html(acciones)
		$('#footer_column').next().html(acciones)
		$('#newCategory').children().html('Añadir una categoría')
		$('.bootstrap-select').css('display', 'none')
		$('bootstrap-select').css('display', 'none')
	}
	if(data == 'subcategorias')
	{
		$('.title_modal').html('Subcategoría')
		$('#new_Name').next().html('Subcategoría')
		$('#edit_Name').next().html('Subcategoría')
		$('#header_temp').remove()
		$('#footer_temp').remove()
		$('#header_column').after('<th id="header_temp">Categoría</th>')
		$('#footer_column').after('<th id="footer_temp">Categoría</th>')
		$('#header_column').html('Subcategoría')
		$('#footer_column').html('Subcategoría')
		$('#header_column').next().next().html(acciones)
		$('#footer_column').next().next().html(acciones)
		$('#newCategory').children().html('Añadir una subcategoría')
		$('#newCategory').css('max-width', '300px')
		$('.bootstrap-select').css('display', 'block')
	}
	$('#header_column').html(nameTable)
	$('#footer_column').html(nameTable)
	initializeDataTable(data)
}

function prepareNewCategory() 
{
	$('#new_Name').val('')
	$('.form-group').removeClass('do-float')
	$('#new_Category').val('')
	$('#new_Category').selectpicker('refresh');
}

function newCategory() 
{
	let dictionary
	let tableName = $('#new_Name').next().html()
	let name = $('#new_Name').val()
	let category = $('#new_Category').val()
	if(name.replace(/(\s+|\n\r?)/g, '') == '')
		return notification('El campo '+ tableName.toLowerCase() +' no puede estar vacío', 2)
	if(tableName == 'Subcategoría')
		if(category == '')
			return notification('No hay una categoría asociada', 2)
	$.post('/categorias/info', {'data': JSON.stringify({
		type: 'new', data: tableName.toLowerCase(), name: name, category: category
	})}).done((data) => {
		$('.close').trigger('click')
		if(tableName == 'Categoría')
		{
			let option = '<option value="'+data.id+'">'+data.name+'</option>'
			$('#new_Category').append(option)
			$('#edit_Category').append(option)
			$('#category').trigger('click')
		}
		else
			$('#subcategory').trigger('click')
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function prepareEditCategory(e) 
{
	let tableName = $('#new_Name').next().html()
	let name
	if(tableName.toLowerCase() == 'categoría')
		name = $(e).parent().prev().html()
	else
	{
		let category = $(e).attr('data')
		name = $(e).parent().prev().prev().html()
		$('#edit_Category').val(category)
		$('#edit_Category').selectpicker('refresh');
	}
	$('#edit_Name').val(name)
	$('#edit_Save').attr('data', e.id)
	$('.form-group').addClass('do-float')
}

function editCategory() 
{
	let tableName = $('#new_Name').next().html()
	let name = $('#edit_Name').val()
	let id = $('#edit_Save').attr('data')
	let category = $('#edit_Category').val()
	if(name.replace(/(\s+|\n\r?)/g, '') == '')
		return notification('El campo '+ tableName.toLowerCase() +' no puede estar vacío', 2)
	if(tableName == 'Subcategoría')
		if(category == '')
			return notification('No hay una categoría asociada', 2)
	console.log(category)
	$.post('/categorias/info', {'data': JSON.stringify({
		type: 'edit', id: id, name: name, category: category, data: tableName.toLowerCase()
	})}).done((data) => {
		$('.close').trigger('click')
		if(tableName == 'Categoría')
			$('#category').trigger('click')
		else
			$('#subcategory').trigger('click')
		return notification(data.message, data.val)
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function deleteCategory(e) 
{
	let tableName = $('#new_Name').next().html()
	let name
	if(tableName.toLowerCase() == 'categoría')
		name = $(e).parent().prev().html()
	else
		name = $(e).parent().prev().prev().html()
	let campo = '<h5>¿Estás seguro de eliminar la '+ tableName.toLowerCase() +' \''+name+'\'?</h5><br/><h6>Escribe la palabra \'Eliminar\' para confirmar</h6>'
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
				const id = e.id
				$.post('/categorias/info', {'data': JSON.stringify({
					type: 'delete', data: tableName.toLowerCase(), id: e.id
				})}).done((data) => {
					$('.close').trigger('click')
					if(tableName == 'Categoría') {
						$('#category').trigger('click')
						$('[value='+ id + ']').remove()
					}
					else
						$('#subcategory').trigger('click')
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