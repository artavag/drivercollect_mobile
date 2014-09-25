$(document).ready(function(){

	/**
	 * Refine search
	 *
	 * This script toggles visibility of additional search options when
	 * refine search button is clicked
	 */
	var elementToToggle = $('#additional-search-options');
	var elementContainer = $('#search-box');

	// Get initial values before toggle
	var elementContainerBackgrColor  = elementContainer.css('background-color');
	var refineSearch = $('.refine-search');
	var refineSearchIcon = $('.refine-search span');

	refineSearch.on('click', function(){

		elementToToggle.toggle(50, 'swing', function(){

			var isVisible = elementToToggle.css('display');

			if (isVisible == 'block')
			{
				if (myViewportWidth < 992 ){
					$('#main-search-options #submit').appendTo($('#additional-search-options'));
				}

				elementContainer.css({ 'background-color': 'rgba(0,0,0, 0.7)' });
				refineSearchIcon.removeClass('icon-chevron-down');
				refineSearchIcon.addClass('icon-chevron-up');
			}
			else
			{
				if (myViewportWidth < 992 ){
					$('#additional-search-options #submit').appendTo($('#main-search-options'));
				}

				elementContainer.css({ 'background-color': elementContainerBackgrColor });
				refineSearchIcon.removeClass('icon-chevron-up');
				refineSearchIcon.addClass('icon-chevron-down');
			}
		});
	});


	/**
	 * This script makes following 3 tasks:
	 *
	 * 1. Changes checked inputs and labels background and text color
	 * 2. Detects current weekday and makes it checked.
	 * 3. Changes checked weekday when "date from" value is changed
	 */

	/**
	 * This the initaial state. Here we are looking all weekday checkbox inputs
	 * to find the checked one
	 */
	var elementToTakeColors = $('button[type="submit"]');
	var elementChekedBackgrColor = elementToTakeColors.css('background-color');
	var elementChekedTextColor = elementToTakeColors.css('color');

	var elemenetWrapper = '.weekdays-wrapper';
	var elementToChangeColors = $(elemenetWrapper + ' label');
	var elementInitialTextColor = elementToChangeColors.css('color');
	var elementInitialBackgrColor = elementToChangeColors.css('background-color');

	var elemenetsToChangeState = $(elemenetWrapper + ' input');

	// First make all checkboxes unchecked
	toUncheckedState(false, elemenetWrapper, elementInitialBackgrColor, elementInitialTextColor);

	// find the checkbox with the weekday that
	// corresponds to current date and make it checked
	elemenetsToChangeState.each(function(){

		// get current day of week
		var currentWeekDay = getCurrentDayOfWeek(false); // returns integer from 1-7. 1 is Monday

		var elemID = $(this).attr('id');

		if (elemID == currentWeekDay)
		{
			// Bring matched element to checked state
			toCheckedState(elemID, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor);
		}
	});


	// label on click
	elementToChangeColors.on('click', function(e){

		e.stopPropagation();

		// get labels for attr.
		var elemID = $(this).attr('for');

		// get label's input id
		var clickedLabelInput = $(elemenetWrapper + ' input[id=' + elemID + ']');

		// when after clicking on label input is also changed
		clickedLabelInput.on('change', function(d){

			d.stopPropagation();

			var clickedLabelInputState = clickedLabelInput.prop('checked'); // is boolean

			clickedLabelInput.unbind('change');

			// if the input is checked then change also it's label
			if (clickedLabelInputState)
			{
				toCheckedState(elemID, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor);
			}
			else
			{
				toUncheckedState(elemID, elemenetWrapper, elementInitialBackgrColor, elementInitialTextColor);
			}
		});
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
		dayOfWeekPicker(elemenetsToChangeState, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor, elementInitialBackgrColor, elementInitialTextColor);

		// Set "date to" value equal to "date from" value
		dateValueSetterFrom(dateFromInput, dateToInput);
	});

	dateToInput.on('changeDate', function(e){
		e.stopPropagation();
		e.preventDefault();

		dateValueSetterTo(dateToInput);
	});


	/**
	 * This script is for radio buttons. Makes following:
	 *
	 * 1. Changes color of selected/unselected radio buttons color
	 *
	 */

	// those are for driver or rider
	var wrapperElement = '.driver-rider-wrapper-input';
	var elementToToggleColors = $(wrapperElement + ' label');
	var initialTextColor = elementToToggleColors.css('color');
	var initialBackgrColor = elementToToggleColors.css('background-color');
	var checkedTextColor = '#ffffff';
	var checkedBackgrColor = 'orange';

	radio_check(wrapperElement, initialBackgrColor, checkedBackgrColor, initialTextColor, checkedTextColor);

	// those are for smoking
	wrapperElement = '.smoking-wrapper';
	elementToTakeColors = $('button[type="submit"]');
	checkedBackgrColor = elementToTakeColors.css('background-color');
	checkedTextColor = elementToTakeColors.css('color');

	radio_check(wrapperElement, initialBackgrColor, checkedBackgrColor, initialTextColor, checkedTextColor);


	/**
	 * This code makes 2 things
	 *
	 * 1. moves refine search button from main-search options to search box beggining
	 * when viewport width is bigger then 768 px
	 *
	 * 2. Moves save button to the end of main-search-options
	 */

	// detecting viewport width
	var myViewportWidth = $('span.my-viewport').width();
	var refineButton = $('.refine-search');

	if (myViewportWidth >= 992 ){
		$('#search-box #submit').appendTo($('#main-search-options'));
	}

	if (myViewportWidth >= 768 ){
		refineButton.prependTo($('#search-box'));
	}
	else {
		refineButton.appendTo($('#main-search-options'));
	}


	$(window).resize(function(){

		myViewportWidth = $('span.my-viewport').width();

		if (myViewportWidth >= 992 ){
			$('#search-box #submit').appendTo($('#main-search-options'));
		}

		if (myViewportWidth >= 768 ){
			refineButton.prependTo($('#search-box'));
		}
		else {
			refineButton.appendTo($('#main-search-options'));
		}
	});
});