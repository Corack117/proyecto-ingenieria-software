function openModal(e) 
{
	//Show modal
	let mContainer = $('.modalContainer')
	let modal = $('.modalLight')
	let textClickClose = $('.clickClose')
	mContainer.css('visibility', 'visible')
	mContainer.animate({opacity: 1}, 300)
	let mContainer2 = $('.dataItem')
	//End show modal
	let swiper = $('.swiper-container')[0].swiper;
	swiper.removeAllSlides()	
	$.post('/productos/info', {'data': JSON.stringify({
		type: 'infoE', id: e.id
	})}).done((data) => {
		$('#info_Name span').html(data.name)
		$('#info_Inventory span').html(data.inventory+' unidades')
		$('#info_Presentation span').html(data.presentation)
		$('#info_Price span').html('$'+data.price)
		$('#info_Description span').html(data.description)
		$('#info_Brand span').html(data.marcaInfo)
		$('#info_Category span').html(data.catInfo)
		$('#info_Subcategory span').html(data.subInfo)
		$('#info_Discount span').html(data.discount+'%')
		$('#info_Promotion').prop('checked', data.hasPromo)
		$('#info_Status').prop('checked', data.status)
		$('#info_Porcentage span').val(data.discount)
		$('#info_Cover').attr('src', '/media/'+data.coverPhoto)
		$(data.images).each((index, value) => {
			$('.swiper-wrapper').append('<div class="swiper-slide"><img src="/media/'+value.image+'" alt="..."></div>')
		})
		swiper.init()
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function closeModal() 
{
	let mContainer = $('.modalContainer');
	let modal = $('.modalLight');
	let textClickClose = $('.clickClose');
	mContainer.animate({opacity: 0}, 300)
	setTimeout(() => {
		mContainer.css('visibility', 'hidden')
	}, 300)
}