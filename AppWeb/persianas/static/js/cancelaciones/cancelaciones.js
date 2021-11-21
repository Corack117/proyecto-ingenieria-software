function cargaTabla() {
    $('#example-1 tfoot th').off('change');
    // Setup - add a text input to each footer cell
    $('#example-1 tfoot th').each(function () {
        let title = $(this).text();
        $(this).html('<input class="form-control" type="text" placeholder="Buscar ' + title + '">');
    });

    // DataTable
    let table = $('#example-1').DataTable({
        'ajax': {
            url: "/searchCancelacion",
            type: "get",
            data: { 'data': JSON.stringify({ type: 'getCancelaciones', status: 1}) },
        },
        "drawCallback": function () {
            // funciones que se ejecutan cada vez que se escribe la tabla
            $('.buttonThModalP').click(openModal);
            $('.buttonThModal').click(openModal);
            $('.hasAdminCancel').parents("tr").css("background-color", "rgb(255,164,032,0.5)");
        },
        'scrollX': true,

    });
    // Apply the search
    table.columns().every(function () {
        let that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
    $('[placeholder="Buscar Acciones"]').prop("disabled", true);
};

//Aceptar los cambios del modo edicion de status
function acceptChangeStatus() {
    //valor del status a cambiar
    let selectStatus = $(this).parents('.containerTdData').eq(0).children('.containerTdStatus').eq(0).children('.changeStatusValue').eq(0).val();
    //Valor anterior
    let container = $(this).parents('td').eq(0).children('.containerTdData').eq(0)
    let ContTextStatus = container.children('.containerTdStatus').eq(0);
    let arreglo = ["Pendiente", "Aceptado", "Denegado"];
    //Caso. si no cambia el valo nuevo del viejo no realiza peticion ni cambio alguno
    if (ContTextStatus.attr("oldStatus") != arreglo[selectStatus - 1]) {
        ContTextStatus.attr("oldStatus", arreglo[selectStatus - 1]);
        // Peticion post para cambio de status
        let changeS = selectStatus;
        let idSell = $(this).parents('tr').eq(0).children('td').eq(0).children('.containerTdData').eq(0).children('div').eq(0).text();
        let idCancel = $(this).parents('tr').eq(0).children('td').eq(0).children('.containerTdData').eq(0).attr('id');
        $.ajax({
            method: "POST",
            url: "/searchCancelacion/",
            data: { 'data': JSON.stringify({ type: 'changeStatus', changeStatus: changeS, idVenta: idSell, idCancelacion: idCancel}) },
        }).done(function (msg) {
            notification(msg.data,5);
            $('#example-1').DataTable().ajax.reload();
        });
    }
    //--Cerrar el modo edicion
    //habilita el boton de edicion
    $(this).parents('td').eq(0).next().children(".containerTdData").eq(0).find(".buttonThChangeStatus").eq(0).prop('disabled', false);
    //Limpia y añade el texto anterior
    let textStatus = container.children('.containerTdStatus').eq(0);
    textStatus.empty();
    textStatus.text(`${textStatus.attr("oldStatus")}`);
    //Limpia y agrega el boton para acceder a la edicion
    let buttonChange = container.children('.containerChangeButt').eq(0);
    buttonChange.empty();
}

//Cerrar el modo edicion para status
function closeEditStatus() {
    let container = $(this).parents('td').eq(0).children('.containerTdData').eq(0)
    let textStatus = container.children('.containerTdStatus').eq(0);
    //habilita el boton de edicion
    $(this).parents('td').eq(0).next().children(".containerTdData").eq(0).find(".buttonThChangeStatus").eq(0).prop('disabled', false);
    //Limpia y añade el texto anterior
    textStatus.empty();
    textStatus.text(`${textStatus.attr("oldStatus")}`);
    //Limpia y agrega el boton para acceder a la edicion
    let buttonChange = container.children('.containerChangeButt').eq(0);
    buttonChange.empty();
}

//Abrir el modo edicion para status
function editStatus() {
    let container = $(this).parents('td').eq(0).prev().children('.containerTdData').eq(0)
    let ContTextStatus = container.children('.containerTdStatus').eq(0);
    let currentStatus = ContTextStatus.text();
    ContTextStatus.attr("oldStatus", currentStatus);//Agrega el atributo oldstatus
    //Limpia y agrega el selector del modo edicion
    ContTextStatus.empty();
    ContTextStatus.append(`<select class="changeStatusValue"> 
            <option value="1">Pendiente</option>
            <option ${(currentStatus == "Aceptado" ? 'selected="selected"' : "")} value="2">Aceptar</option>
            <option ${(currentStatus == "Denegado" ? 'selected="selected"' : "")} value="3">Denegar</option></select>`
    );
    //Limpia y agrega los botones del modo edicion
    let buttonChange = container.children('.containerChangeButt').eq(0);
    buttonChange.empty();
    buttonChange.append(`<span class="icon ti-check buttAcept" title="Aceptar"></span>
            <span class="icon ti-close buttCancel" title="Cancelar"></span>`
    );
    $(this).prop('disabled', true);
}

//Actualiza la tabla cuando se cambia el valor del select status
function changeDataTable(){
    let table = $('#example-1');
    // limpiar tabla
    table.DataTable().clear().destroy();

    $('#example-1 tfoot th').off('change');
    // Setup - add a text input to each footer cell
    $('#example-1 tfoot th').each(function () {
        let title = $(this).text();
        $(this).html('<input class="form-control" type="text" placeholder="Buscar ' + title + '">');
    });
    // Creacion de la nueva tabla
    table.DataTable({
        'ajax': {
            url: "/searchCancelacion",
            type: "get",
            data: { 'data': JSON.stringify({ type: 'getCancelaciones', status: $(this).val() }) },
        },
        "drawCallback": function () {
            // funciones que se ejecutan cada vez que se escribe la tabla
            $('.buttonThModalP').click(openModal);
            $('.buttonThModal').click(openModal);
            $('.hasAdminCancel').parents("tr").css("background-color", "rgb(255,164,032,0.5)");
        },
        'scrollX': true,
    });
    // Apply the search
    table.DataTable().columns().every(function () {
        let that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
    $('[placeholder="Buscar Acciones"]').prop("disabled", true);
}