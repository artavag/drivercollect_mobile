$(document).ready(function(){

	/**
	 * This script makes following 3 tasks:
	 *
	 * 1. Detects current weekday and makes it checked.
	 * 2. Changes checked weekday when "date from" value is changed
	 */

	/**
	 * This the initaial state. Here we are looking all weekday checkbox inputs
	 * to find the checked one
	 */
	var elemenetWrapper = '.ride-repetition';
	var elemenetsToUncheck = $(elemenetWrapper + ' input');

	// First make all checkboxes unchecked
	toUncheckedStateSimple(false, elemenetWrapper);

	// find the checkbox with the weekday that
	// corresponds to current date and make it checked
	elemenetsToUncheck.each(function(){

		// get current day of week
		var currentWeekDay = getCurrentDayOfWeek(false); // returns integer from 1-7. 1 is Monday

		var elemID = $(this).attr('id');

		if (elemID == currentWeekDay)
		{
			// Bring matched element to checked state
			toCheckedStateSimple(elemID, elemenetWrapper);
		}
	});


	/**
	 * This script watches for changes in from date field and does:
	 *
	 * 1. changes weekday checkbox to be checked corresponding to selected date
	 * 2. makes date_to value equal to date_from value
	 */

	var dateFromInput = $('#from_date');
	var dateToInput = $('#to_date');

	dateFromInput.on('changeDate', function(e){
		e.stopPropagation();
		e.preventDefault();

		// change weekday checkboxes
		dayOfWeekPickerSimple(elemenetsToUncheck, elemenetWrapper);

		// Set "date to" value equal to "date from" value
		dateValueSetterFrom(dateFromInput, dateToInput);
	});

	dateToInput.on('changeDate', function(e){
		e.stopPropagation();
		e.preventDefault();

		dateValueSetterTo(dateToInput);
	});

});



