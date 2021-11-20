function openModal(e) 
{
	//Show modal
	let mContainer = $('.modalContainer')
	mContainer.css('visibility', 'visible')
	mContainer.animate({opacity: 1}, 300)
	//End show modal
	let dataSend = {
		data: JSON.stringify({ id: e.id }),
		type: 'info'
	}
	requestCustomerPersianas().post(dataSend).done((data) => {
		const name = `${data.name} ${data.flastName} ${data.slastName}`
		$('#info_Name span').html(name)
		$('#info_Email span').html(data.email)
		$('#info_IsActive').prop('checked', data.isActive)
		$('#info_Cover').attr('src', '/media/'+data.profilePhoto)
	}).fail(() => {
		return notification('Error de comunicación, contactate con el administrador', 2)
	})
}

function closeModal() 
{
	let mContainer = $('.modalContainer');
	mContainer.animate({opacity: 0}, 300)
	setTimeout(() => {
		mContainer.css('visibility', 'hidden')
	}, 300)
}