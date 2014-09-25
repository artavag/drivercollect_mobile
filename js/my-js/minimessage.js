jQuery(document).ready(function($) {

	$('.deleteMiniMessage').on('click', function() {
		if (confirm('Are you sure you want to delete this mini message?')) {
			window.location.href = $(this).attr('rel');
		}
		return false;
	});

	$('.show-msg').on('click', function(){
		$(this).hide();
		$('.hide-msg').show();
		$('.table-msgs').show();
	});

	$('.hide-msg').on('click', function(){
		$(this).hide();
		$('.show-msg').show();
		$('.table-msgs').hide();
	});
});
