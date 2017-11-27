var styles = 'position: absolute; display: none; border-radius: 5px; transition-property: left, top; transition-duration: 0.5s; z-index: 1;';
jQuery('head').append('<style type="text/css">._blob {' + styles + '}</style>');


var defaultOptions = {
	bg: 'linear-gradient(to right, rgb(102, 125, 182), rgb(0, 130, 200), rgb(0, 130, 200), rgb(102, 125, 182))'
}

function initLavamenu($nav, bg) {
	$nav.find('li').css({zIndex: 1, position: 'relative'});
	var $active;
	var $blob;
	var timeout;
	
	$active =  $nav.find('.active');
	var id = jQuery('._blob').length + 1;
	var $body = jQuery('body');
	$body.prepend('<div class="_blob" id="blob-'+ id +'"></div>');

	$blob = $body.find('#blob-'+id);

	resetBlob($active, $blob, bg);

	$nav.on('mouseenter', ' > li', function() {
		if (timeout) {
			clearTimeout(timeout);
		}

		var $el = jQuery(this);
		$blob.css({width: $el.outerWidth(), display: 'block', top: $el.offset().top, left: $el.offset().left, height: $el.outerHeight(), background: (bg ? bg : defaultOptions.bg)});

	}).on('mouseleave', ' > li', function() {
		if (timeout) {
			clearTimeout(timeout);
		}
		
		timeout = setTimeout(function() {
			resetBlob($active, $blob, bg);
		}, 1000);
	});
}

function resetBlob($active, $blob, bg) {
	$blob.css({width: $active.outerWidth(), display: 'block', top: $active.offset().top, left: $active.offset().left, height: $active.outerHeight(), background: (bg ? bg : defaultOptions.bg)});

	$blob.css('background', bg ? bg : defaultOptions.bg);
}

jQuery.fn.lavaMenu = function(options) {
	var $this = jQuery(this);

	if ($this.length > 1) {
		$this.each(function() {
			initLavamenu(jQuery(this), options ? options.bg : '');
		});
	}
	else {
		initLavamenu($this, options ? options.bg : '');
	}

	return $this;
}