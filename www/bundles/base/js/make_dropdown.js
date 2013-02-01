var $j = jQuery.noConflict();

function DropDown(el) {
	this.dd = el;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
	var obj = this;

	obj.dd.on('click', function(event){
		$j(this).toggleClass('active');
		event.stopPropagation();
	});	
	}
}

$j(function() {

	var dd = new DropDown( $j('#dd') );

	$j(document).click(function() {
		// all dropdowns
		$j('.wrapper-dropdown').removeClass('active');
	});

});
