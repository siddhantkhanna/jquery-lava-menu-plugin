function initImageSlider(array, $parent, backImage, nextImage) {
	var timer;

	$parent.html('<div style="position: relative; height: 100%;"><a style="cursor: pointer; position: absolute; z-index: 0; top: 50%; transform: translateY(-50%); left: 5px;" class="_back"><img height="20px" src="' + (backImage ? backImage : 'https://n6-img-fp.akamaized.net/free-icon/last-track-left-arrow_318-85985.jpg?size=338c&ext=jpg') + '"></a> <a style="transition: right 0.5s ease; cursor: pointer; position: absolute; z-index: 0; top: 50%; transform: translateY(-50%); right: 5px;" class="_next"><img height="20px" src="' + (nextImage ? nextImage : 'https://imageog.flaticon.com/icons/png/512/32/32213.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF') + '"></a><div class="_slide-area"></div></div>');
	var currentImage = 0;

	var $slideArea = jQuery('._slide-area');
	putImage($slideArea, array[0]);
	$parent.on('click', '._back', function() {
		if (currentImage == 0) {
			currentImage = array.length;					
		}

		currentImage-=1;
		putImage($slideArea, array[currentImage]);
		timerEnable();
	})
	.on('click', '._next', function() {
		if (currentImage == array.length - 1) {
			currentImage = -1;
		}

		currentImage+=1;
		putImage($slideArea, array[currentImage]);
		timerEnable();
	});

	timerEnable();

	function timerEnable() {
		if (timer)
			clearInterval(timer);
		timer = setInterval(function() {
			if (currentImage == array.length - 1) {
				currentImage = 0;
				putImage($slideArea, array[0]);
				return;
			}

			currentImage+=1;
			putImage($slideArea, array[currentImage]);
		}, 5000);
	}
}

function putImage($slideArea, imgSrc) {
	if ($slideArea.html().trim() == '') {
		$slideArea.html('<img class="new" style="max-height: 100%; max-width: 100%; position: absolute; left: 25px; top: 0; bottom: 0;" src="' + imgSrc + '" />');
		setTimeout(function() {
			var width = jQuery('.new').outerWidth();
			var actualWidth = ($slideArea.outerWidth() - 55) - width;
			jQuery('._next').css('right', actualWidth);
		}, 200);
	}
	else {
		$slideArea.find('img').addClass('old').removeClass('new');
		
		setTimeout(function() {
			jQuery('.old').remove();
		}, 1000);

		jQuery('.old').animate({
		    left: -1*$slideArea.outerWidth(),
		    opacity: 0
		}, 1000);

		$slideArea.append('<img class="new" style="opacity: 0; max-height: 100%; max-width: 100%; position: absolute; left: ' + $slideArea.outerWidth() + 'px; top: 0; bottom: 0;" src="' + imgSrc + '" />');

		setTimeout(function() {
			var width = jQuery('.new').outerWidth();
			var actualWidth = ($slideArea.outerWidth() - 55) - width;
			jQuery('._next').css('right', actualWidth);
		}, 200);

		$slideArea.find('.new').animate({
			left: 25,
			right: 25,
			opacity: 1
		}, 1000);
		
	}
}


jQuery.fn.imgSlider = function(array, options) {
	if (!array || array.length < 2) {
		throw "the array must contain at least 2 elements for the slider to do something";
	}

	var $this = jQuery(this);

	if ($this.length == 1) {
		initImageSlider(array, $this, options ? options.backImage ? options.backImage : '' : '', options ? options.nextImage ? options.nextImage : '' : '');
	}
	else {
		$this.each(function() {
			initImageSlider(array, jQuery(this));
		});
	}

	return $this;
}