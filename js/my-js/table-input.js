$(document).ready(function(){

	/**
	 * this script is used to perform delete request,location... action
	 * items are selected by check boxes
	 *
	 */
	var checkboxes = $("input[name='openrequest_id[]']");
	var selectAll = $('#select_all');
	var deleteButton = $('#delete_multiple');
	var message = 'Are you sure want to delete this requests?';

	deleteMultiple(checkboxes, selectAll, deleteButton, message);

	var checkboxesLoc = $("input[name='location_id[]']");
	var selectAllLoc = $('#select_all_loc');
	var deleteButtonLoc = $('#delete_multiple_loc');
	var messageLoc = 'Are you sure want to delete this locations?';

	deleteMultiple(checkboxesLoc, selectAllLoc, deleteButtonLoc, messageLoc);

	// this deletes single item
	$('.delete-item').on('click', function() {

		var finalMessage = 'Are you sure want to delete this ' + $(this).attr('data-name') + '?';

		if (confirm(finalMessage)) {
			window.location.href = $(this).attr('rel');
		}

		return false;
	});
});