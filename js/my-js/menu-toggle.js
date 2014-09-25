$(document).ready(function(){

	/**
	 * this script toggles main navigation when menu button is clicked
	 */
	$('#menu-button').on('click', function(){

		$('.welcome').toggleClass('hidden-xs');
		$('.main-navbar').toggleClass('hidden-xs');

		scroller();
		footerPlacer();
	});


	/**
	 * this script toggles language switcher
	 */
	$('#languageSwitcher').on('click', function(e){
		e.stopPropagation();
		$('#languageSwitcherAll').toggle(100);
		scroller();
		footerPlacer();
	});

	$('body').on('click', function(e){
		$('#languageSwitcherAll').hide();
	});


	/**
	 * this script toggles navigation of left menu when menu button is clicked
	 */
	var menuButtonLeft = $('#menu-button-left');

	menuButtonLeft.on('click', function(){

		$('.leftmenu ul').toggle(100, function() {

			var isVisible = $('.leftmenu ul').css('display');

			if (isVisible == 'none') {
				menuButtonLeft.addClass('icon-chevron-down');
				menuButtonLeft.removeClass('icon-chevron-up');
			}
			else {
				menuButtonLeft.addClass('icon-chevron-up');
				menuButtonLeft.removeClass('icon-chevron-down');
				scroller();
			}

			footerPlacer();
		});
	});



	/**
	 * this script toggles users table in groups created page when show users button is clicked
	 */
	$('#toggle-users').on('click', function(){

		var toggleButtons = $('#toggle-users');

		$('.users-table').toggle(100, function() {

			var isVisible = $('.users-table').css('display');

			if (isVisible == 'none') {
				toggleButtons.empty();
				toggleButtons.prepend('Show users<span class="icon icon-chevron-down"></span>');
				footerPlacer();
			}
			else {
				toggleButtons.empty();
				toggleButtons.prepend('Hide users<span class="icon icon-chevron-up"></span>');
				scroller();
			}
		});
	});


	/**
	 * This script toggles additional details and multiple requests in "add open request page"
	 */
	$('#additional-details').on('click', function(){
		$('#additional-details-data').toggle();
	});

	$('#multiple-request').on('click', function(){
		$('#multiple-request-data').toggle();
	});

});