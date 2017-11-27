function initDragable($el, isParent) {
	var mousedown = false;
	var offsetLeft = 0;
	var offsetTop = 0;
	$el.css('-webkit-user-select', 'none');
	$el.on('mousedown', function(e) {
		mousedown = true;
		offsetLeft = e.clientX - jQuery(this).offset().left;
		offsetTop = e.clientY - jQuery(this).offset().top;
	});
	jQuery(document).on('mousemove', function(e) {
		if (mousedown) {
			relocateBlob(e, $el, isParent, offsetTop, offsetLeft);
		}
	}).on('mouseup', function() {
		mousedown = false;
		offsetLeft = 0;
		offsetTop = 0;
	});
}

jQuery.fn.dragable = function(options) {
	let $this = jQuery(this);
	if ($this.length > 1) {
		$this.each(function() {
			initDragable(jQuery(this),options ? options.parent : false);
		});
	}
	else {
		initDragable($this, options ? options.parent : false);
	}

	return $this;
}


function relocateBlob(e, $el, isParent, offsetTop, offsetLeft) {
	var mouseX = e.clientX;
	var mouseY = e.clientY;

	mouseX -= offsetLeft;
	mouseY -= offsetTop;
	if (isParent) {
		$el.parent().css({left: mouseX + 'px', top: mouseY + 'px'});
	}
	else {
		$el.css({left: mouseX + 'px', top: mouseY + 'px'});
	}
}