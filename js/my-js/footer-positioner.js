/**
 * This script positions the footer always at the bottom of the page
 * when page's content does not fits page's height
 *
 */

$(document).ready(function(){

	footerPlacer();

	$(window).on('resize load', function(){
		footerPlacer();
	});
});