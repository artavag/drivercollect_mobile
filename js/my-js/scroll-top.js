$(document).ready(function(){

	var scrollElem = $('.scroll-top');

	scroller();

	scrollElem.on ('click', function(e){
		e.stopPropagation();
		$('body,html').animate({ scrollTop: 0 }, 200);
	});

});