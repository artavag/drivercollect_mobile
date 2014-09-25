$(document).ready(function(){

	$('dl.text-regular dd').css({
		display: 'none'
	});

	$('dl.text-regular dt').on('click', function(e){
		var id = $(this)[0].id;
		$(this).toggleClass('collapsed');
		$('dl.text-regular dd.' + id).toggle(100);
	});
});