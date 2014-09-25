$(document).ready(function(){

	/**
	 * this scripts positions footer correctly when
	 * alert message is closed and removed from dom
	 */
	$('.alert').on('closed.bs.alert', function () {
		footerPlacer();
	});
});