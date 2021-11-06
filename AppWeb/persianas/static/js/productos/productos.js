const peticiones = apiRequests('peticion/admins')


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
		   url: "/productos/curd",
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
				   // let actions = value[6][0] + value[7] + value[6][1] + value[7] + value[6][2] + value[8] + value[6][3] + value[6][4] + value[7] + value[6][5]
				   // value[6] = actions
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