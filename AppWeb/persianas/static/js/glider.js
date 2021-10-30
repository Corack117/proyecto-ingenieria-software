var sliderPosition = 0;
var slider;
var gliderIntervalValue;
window.addEventListener('load', function() {
	newGlider();
	document.querySelector('.carousel_indicator').addEventListener('click', function() {
		clearInterval(gliderIntervalValue);
		gliderIntervalValue = setInterval(function() {
			sliderPosition = slider.slide;
			gliderInterval(slider);
		}, 3000);
	});
});

function newGlider() 
{
		slider = new Glider(document.querySelector('.carousel_list'), {
		slidesToShow: 1,
		dots: '.carousel_indicator',
		draggable: false,//true the last time
		scrollLock: true,
		autoplay: 1000,
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 775,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				draggable: false
			  }
			}
		  ]
	});
	document.querySelector('.carousel').style.visibility = "visible";
	
	gliderIntervalValue = setInterval(function() {
		gliderInterval(slider);
	}, 3000);
}

function gliderInterval(slider)
{
	const slides = slider.slides.length - slider.opt.slidesToShow
	if (slider.slide === slides)
	{
		sliderPosition = 0;
		slider.scrollItem(sliderPosition);
	}
	else 
	{
		sliderPosition += 1;
		slider.scrollItem(sliderPosition);
	}
}