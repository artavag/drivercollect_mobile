var lastClickedStarID = 0;
var isStarClicked = false;
var ratingStarSelector = '.rating-stars-text-single';

jQuery(document).ready(function($) {

	$('#addrfrom').on('click', function() {
		isStarClicked = false;
	});

	$('.star').on('mouseover', function(e){

		var starID = $(this).attr('id');

		hideAllRatingStarTexts();
		showRatingText(starID);

		if (!isStarClicked){
			uncolorAllStars();
			colorUntilStarID(starID);
		}

	}).on('mouseout', function(e){

		hideAllRatingStarTexts();
		showRatingText(lastClickedStarID);

		if (!isStarClicked){
			uncolorAllStars();
		}

	}).on('click', function(){

		isStarClicked = true;
		lastClickedStarID = $(this).attr('id');

		uncolorAllStars();
		colorUntilStarID(lastClickedStarID);

		// pass star id value value to form's hidden field
		$('#rating').val(lastClickedStarID);

	});
});