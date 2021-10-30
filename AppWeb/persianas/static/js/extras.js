$(document).ready(function () {

	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
				// Only send the token to relative URLs i.e. locally.
				xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
			}
		}
	});
});

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

function notification(campo, val) 
{
	let titleText;
	let typeVal;
	switch (val) 
	{
		case 1:
			titleText = 'Ups! Sucedio un problema';
			typeVal = 'info';
			campo = 'El campo <b>"'+ campo +'"</b> no puede estar vacío';
		break;
		case 2:
			titleText = 'Ups! Sucedio un problema';
			typeVal = 'info';
			// campo ya tiene un valor
		break;
		case 3:
			titleText = 'Completado';
			typeVal = 'success';
			campo = 'El '+ campo +' ha sido registrado con éxito';
		break;
		case 4:
			// titleText = 'Ya casi!';
			typeVal = 'success';
			// campo = 'Serás redirigido, para completar tu perfil';
		break;
		case 5:
			titleText = 'Completado';
			typeVal = 'success';
		break;
	}
	if(val != 4)
		Swal.fire({
			title: titleText,
			icon: typeVal,
			html: campo,
			confirmButtonText:
			  'Cerrar',
			// timer: 2000,
		})
	else
		Swal.fire({
			title: titleText,
			icon: typeVal,
			html: campo,
			confirmButtonText:
			  'Cerrar',
			timer: 2500,
		})
	
	$('.swal2-confirm').css({backgroundColor: '#003778'})
	$('.swal2-info').css({color: '#c48b11', borderColor: '#c48b11'})
}


function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}