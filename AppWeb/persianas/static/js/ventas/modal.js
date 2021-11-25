// Mostrar el modal
function openModal() {
    //Show modal
    // console.log($(this).hasClass('buttonThModalP'));
    let mContainer = $('.modalContainer')[0];
    let modal = $('.modal')[0];
    let textClickClose = $('.modalbuttonContainer')[0];
    mContainer.style.visibility = 'visible';
    mContainer.style.transition = 'visibility 0s';
    modal.classList.remove('modalClose');
    textClickClose.style.visibility = 'visible';
    //End show modal

    //Add information to the modal
    let modalDataContainer = $('.modalDataContainer');
    modalDataContainer.empty();
    //Modal productos
    if ($(this).hasClass('buttonThModalP')) {
        //Obtener el diccionario de datos de productos de la venta
        let idSell = $(this).parents('tr').eq(0).children('td').eq(0).children('.containerTdData').eq(0).attr('idVenta');
        $.ajax({
            method: "GET",
            url: "/searchVenta/",
            data: { 'data': JSON.stringify({ type: 'getDataVenta', idVenta: idSell }) },
        }).done(function (msg) {
            let DicAddress = msg['data'];
            if(DicAddress == ""){
                notification("Hubo un error. Contacte con un administrador", 2);
            }else{
                //Agregar los datos al modal
                $(".modalTitulo").empty().append(`<h3 style="margin-bottom: 30px;">Productos</h3>`);
                modalDataContainer.append(`<div class="titleDataContent">
                    <div class="dataItem"><span>Cantidad</span></div>
                    <div class="dataItem"><span>SKU</span></div>
                    <div class="dataItem"><span>Nombre</span></div>
                    <div class="dataItem"><span>Precio</span></div>
                    <div class="dataItem"><span>Total</span></div>
                    </div>
                    <div class="modalData" id="productos"></div>`
                );
                let modalData = $(`#productos`);
                for (let x in DicAddress) {
                    modalData.append(`<div class="DataContent">
                    <div class="dataItem"><span>${DicAddress[x]["quantity"]}</span></div>
                    <div class="dataItem"><span>${DicAddress[x]["sku"]}</span></div>
                    <div class="dataItem"><span>${DicAddress[x]["name"]}</span></div>
                    <div class="dataItem"><span>${DicAddress[x]["price"]}</span></div>
                    <div class="dataItem"><span>${DicAddress[x]["quantity"] * DicAddress[x]["price"]}</span></div>
                    </div>`
                    );
                }
            }
        });
    } else if ($(this).hasClass('buttonThModal')) { //Modal address
        $(".modalTitulo").empty().append(`<h3>Dirección</h3>`);
        //Nombres que se muestran en el modal y posisionamiento de los datos
        let addressNames = {
            "usuario": {
                "title": "Usuario",
                "cliente": "Cliente",
                "destinatario": "Destinatario",
                "telefono": "Telefono",
            },
            "domicilio": {
                "title": "Domicilio",
                "numeroExterior": "Número exterior",
                "calle": "Calle",
                "numeroInterior": "Número interior",
                "entreCalle1": "Entre calle 1",
                "entreCalle2": "Entre calle 2",
                "cp": "Codigo postal",
                "colonia": "Colonia",
                "municipioAlcaldia": "Municipio/Alcaldia",
                "estado": "Estado",
                "pais": "Pais",
            },
            "datosAdicionales": {
                "title": "Comentarios adicionales",
                "detallesDeEntrega": "Detalles extra",
            },
        };
        //Obtener el diccionario del atributo dataAddress
        let idSell = $(this).parents('tr').eq(0).children('td').eq(0).children('.containerTdData').eq(0).attr('idVenta');
        $.ajax({
            method: "GET",
            url: "/searchVenta/",
            data: { 'data': JSON.stringify({ type: 'getDataAddress', idVenta: idSell }) },
        }).done(function ( msg ) {
            let DicAddress = msg[ 'data' ];
            if ( DicAddress == "" ) {
                notification("Hubo un error. Contacte con un administrador", 2);
            } else {
                //Agregar los datos al modal
                for ( let title in addressNames ) {
                    modalDataContainer.append(`<div class="titleDataContent"><span>${addressNames[title]["title"]}</span></div>
                        <div class="modalDataA" id="${title}"></div>`
                    );
                    let modalData = $(`#${title}`);
                    if (title != "datosAdicionales") { //Caso "datosAdicionales" solo se agrega un div
                        for (let x in addressNames[title]) {
                            if (x != "title") { //Ignorar el nombre del titulo
                                if(DicAddress[x] != null)
                                modalData.append(`<div class="DataContentA">
                            <div class="dataItemA"><span>${addressNames[title][x]}</span></div>
                            <div class="dataItemA2"><span>${DicAddress[x]}</span></div></div>`
                                );
                                else
                                modalData.append(`<div class="DataContentA">
                                <div class="dataItemA"><span>${addressNames[title][x]}</span></div>
                                <div class="dataItemA2"><span>${$('.containerTdData').attr('dataName')}</span></div></div>`
                                    );
                            }
                        }
                    } else { //Caso "datosAdicionales" solo se agrega un div
                        modalData.append(`<div class="DataContent">
                            <div class="dataItem2"><span>${DicAddress["detallesDeEntrega"]}</span></div></div>`
                        );
                    }
                }
            }
        });
    } else if ($(this).hasClass('buttonThChangeCancelStatus')){
        let idSell = $(this).parents('tr').eq(0).children('td').eq(0).children('.containerTdData').eq(0).attr('idVenta');
        $(".modalTitulo").empty().append(`<h3 style="margin-bottom: 30px;">Generar cancelación de pedido</h3>`);
        modalDataContainer.append(`<div class="titleDataContent">
                <div class="dataItem"><span>Número de pedido</span></div>
                </div>
                <div class="modalDataA">
                    <div class="DataContent">
                        <div class="dataItem"><span>${idSell}</span></div>
                    </div>
                </div>`
        );
        modalDataContainer.append(`<div class="titleDataContent">
                <div class="dataItem"><span>Razón de cancelación</span></div>
                </div>
                <textarea class="textArea" cols="10"></textarea>`
        );
        $(".modalbuttonContainer").append(`<div class="clickGenerateCancelRequest" id="${idSell}">Generar</div>`);
    }
    else {
        alert('Error');
    }
}

// Ocultar el modal
function closeModal() {
    let mContainer = $('.modalContainer')[0];
    let modal = $('.modal')[0];
    let textClickClose = $('.modalbuttonContainer')[0];
    modal.classList.add('modalClose');
    mContainer.style.transition = 'visibility 0.3s';
    mContainer.style.visibility = 'hidden';
    textClickClose.style.visibility = 'hidden';
    $(".modalbuttonContainer").empty().append(`<div class="clickClose">Cerrar</div>`);
}