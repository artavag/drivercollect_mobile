jQuery(document).ready(function($) {
	var activeDealButtonSelector = '.show-deals';
	var activeDealTables = '.active-deal-table';
	var activeAddName = 'ads_all';
	//var activeAddName = {{ data.role }};

	// hide all tables but show ads_all at the beginning
	$(activeDealTables).hide();
	$("#" + activeAddName).show();

	// make all buttons unselected then make selected only the correct one
	$(activeDealButtonSelector).removeClass('active-deal-add-selected');
	$("span[data-table=" + activeAddName + "]").addClass('active-deal-add-selected');

	$(activeDealButtonSelector).on('click', function() {

		// get the data-table attribute of the button
		activeAddName = $(this).attr('data-table');

		// hide all tables
		$(activeDealTables).hide();

		// show the clicked one
		$('#' + activeAddName).show();

		$(activeDealButtonSelector).removeClass('active-deal-add-selected');
		$('span[data-table=' + activeAddName + ']').addClass('active-deal-add-selected');

		footerPlacer();
	});
});