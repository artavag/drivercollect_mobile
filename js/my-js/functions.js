/**
 * Makes the element by the given id colorized and checked
 * if no id is passed makes all elements checked
 */
function toCheckedState(elemID, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor)
{
	var selectorInput = ' input';
	var selectorLabel = ' label';

	if (elemID) {
		selectorInput = ' input[id=' + elemID + ']';
		selectorLabel = ' label[for=' + elemID + ']';
	}

	$(elemenetWrapper + selectorInput).attr('checked', true);
	$(elemenetWrapper + selectorInput).prop('checked', true);

	$(elemenetWrapper + selectorLabel).css({
		'background-color': elementChekedBackgrColor,
		'color': elementChekedTextColor
	});
}


/**
 * Makes the element by the given id colorized and checked
 * if no id is passed makes all elements checked
 */
function toCheckedStateSimple(elemID, elemenetWrapper)
{
	var selectorInput = ' input';

	if (elemID) {
		selectorInput = ' input[id=' + elemID + ']';
	}

	$(elemenetWrapper + selectorInput).attr('checked', true);
	$(elemenetWrapper + selectorInput).prop('checked', true);
}


/**
 * Makes the element by the given id uncolorized and unchecked
 * if no id is passed makes all elements unchecked
 */
function toUncheckedState(elemID, elemenetWrapper, elementInitialBackgrColor, elementInitialTextColor)
{
	var selectorInput = ' input';
	var selectorLabel = ' label';

	if (elemID) {
		selectorInput = ' input[id=' + elemID + ']';
		selectorLabel = ' label[for=' + elemID + ']';
	}

	$(elemenetWrapper + selectorInput).attr('checked', false);
	$(elemenetWrapper + selectorInput).prop('checked', false);

	$(elemenetWrapper + selectorLabel).css({
		'background-color': elementInitialBackgrColor,
		'color': elementInitialTextColor
	});
}


/**
 * Makes the element by the given id unchecked
 * if no id is passed makes all elements unchecked
 */
function toUncheckedStateSimple(elemID, elemenetWrapper)
{
	var selectorInput = ' input';

	if (elemID) {
		selectorInput = ' input[id=' + elemID + ']';
	}

	$(elemenetWrapper + selectorInput).attr('checked', false);
	$(elemenetWrapper + selectorInput).prop('checked', false);
}


/**
 * Calculates and returns the current day of week based on submitted date argument
 *
 * if argument is false then returns weekday corresponding to current date
 *
 * returns integer in range 1 - 7. 1 is Monday, 7 is Sunday
 */
function getCurrentDayOfWeek(date)
{
	var today = new Date();

	// if date is not given calculate the weekday based on current date
	var currentWeekDay = today.getUTCDay(); // contains integer from 0 to 6, beggining with sunday = 0, monday = 1...

	// if date is given calculate the weekday based on given date not on current date
	if (date)
	{
		// Convert 2014-09-27 to 09/27/2017
		// We need this only for safari. it needs date in format: mm/dd/2014
		var pattern = /(\d{4})-(\d{2})-(\d{2})/g;
		var match = pattern.exec(date);

		var safari_date = match[2] + '/' + match[3] + '/' + match[1];

		var from_date = new Date(safari_date);

		// Calculate day of weeks
		// By default Sunday is 0, Monday is 1, and so on. We want that sunday be 7.
		currentWeekDay = from_date.getDay();
	}

	if (currentWeekDay == 0){
		currentWeekDay = 7; // we make Sunday to be 7
	}

	return currentWeekDay;
}


/**
 * Checks corresponding weekday checkbox when from date is changed
 */
function dayOfWeekPickerSimple(elemenetsToUncheck, elemenetWrapper)
{
	var date_string = $('#from_date').val().trim();
	var currentWeekDay = getCurrentDayOfWeek(date_string);

	// first make all elements unchecked
	toUncheckedStateSimple(false, elemenetWrapper);

	elemenetsToUncheck.each(function(){

		var elemID = $(this).attr('id');

		if (elemID == currentWeekDay)
		{
			// Bring matched element to checked state
			toCheckedStateSimple(elemID, elemenetWrapper);
		}
	});
}

/**
 * Checks corresponding weekday checkbox when from date is changed
 */
function dayOfWeekPicker(elemenetsToUncheck, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor, elementInitialBackgrColor, elementInitialTextColor)
{
	var date_string = $('#from_date').val().trim();
	var currentWeekDay = getCurrentDayOfWeek(date_string);

	// first make all elements unchecked
	toUncheckedState(false, elemenetWrapper, elementInitialBackgrColor, elementInitialTextColor);

	elemenetsToUncheck.each(function(){

		var elemID = $(this).attr('id');

		if (elemID == currentWeekDay)
		{
			// Bring matched element to checked state
			toCheckedState(elemID, elemenetWrapper, elementChekedBackgrColor, elementChekedTextColor);
		}
	});
}


/**
 * Sets date to value equal to date from value
 */
function dateValueSetterFrom(dateFromInput, dateToInput)
{
	var dateValue = dateFromInput.val().trim();

	dateFromInput.attr('value', dateValue);

	dateToInput.attr('value', dateValue);
	dateToInput.val(dateValue);
}

/**
 * Sets date to value equal to date from value
 */
function dateValueSetterTo(dateToInput)
{
	var dateValue = dateToInput.val().trim();
	dateToInput.attr('value', dateValue);
}


/**
 *
 *
 */
function radio_check(wrapperElement, initialBackgrColor, checkedBackgrColor, initialTextColor, checkedTextColor)
{
	// this is the initial state. We are looking here the check radio button in order to colorize it.
	$(wrapperElement + ' input').each(function(){

		var checked_driver = $(this).prop('checked');
		var checked_driver_id = $(this).attr('id');

		if (checked_driver)
		{
			$( wrapperElement + ' label[for=' + checked_driver_id + ']').css({
				'background-color': checkedBackgrColor,
				'color': checkedTextColor
			});
		}
	});

	$(wrapperElement + ' label').on('click', function(e){

		e.stopPropagation();

		var elemID = $(this).attr('for');
		var input_driver = $(wrapperElement + ' input[id=' + elemID + ']');

		// Here we make all radios unchecked and uncolored
		$(wrapperElement + ' input').each(function(){

			// first remove checked attribute from all radio buttons
			$(this).attr('checked', false);

			// ... and bring to default/unchecked state
			$(wrapperElement + ' label').css({
				'background-color': initialBackgrColor,
				'color': initialTextColor
			});
		});

		input_driver.on('change', function(d){

			d.stopPropagation();

			var clickedLabelInputState = input_driver.prop('checked');
			input_driver.unbind('change');

			if (clickedLabelInputState)
			{
				$(wrapperElement + ' input[id=' + elemID + ']').attr('checked', true);

				$(wrapperElement + ' label[for=' + elemID + ']').css({
					'background-color': checkedBackgrColor,
					'color': checkedTextColor
				});
			}
		});
	});
}


/**
 * Is used to delete multiple locations/requests/deals
 *
 * @param checkboxes
 * @param selectAll
 * @param deleteButton
 * @param message
 */
function deleteMultiple(checkboxes, selectAll, deleteButton, message )
{
	// check if there is any element in list
	var count = checkboxes.length;
	var disabledElements = 0;

	// count how many disabled checkboxes we have
	checkboxes.each(function(){

		if ($(this).attr('disabled')){
			disabledElements++;
		}
//
//		if ($(this).prop('checked')){
//			$(this).attr('checked', true);
//		}
//		else {
//			$(this).attr('checked', false);
//
//			// if even one checkbox is unchecked then uncheck select_all checkbox
//			selectAll.prop('checked', false);
//			selectAll.attr('checked', false);
//		}
	});

	// if all elements are disabled then make select all disabled too
	if (disabledElements >= count)
	{
		selectAll.attr('disabled', true);
	}

	// if there are some open requests and not all checkboxes are disabled
	if (count >= 1 && disabledElements < count)
	{
		selectAll.on('click', function(){

			if ($(this).prop('checked') == true)
			{
				// check that checkbox is not disabled. (We can not delete open requests that are in active deal)
				checkboxes.each(function(){
					if (!$(this).attr('disabled'))
					{
						$(this).attr('checked', true);
						$(this).prop('checked', true);
					}
				});

				deleteButton.fadeIn(300);
				$(this).attr('title', 'Deselect all');
			}
			else
			{
				checkboxes.attr('checked', false);
				checkboxes.prop('checked', false);
				$(this).attr('title', 'Select all');
				deleteButton.fadeOut(300);
			}
		});

		checkboxes.on('click', function(){

			if ($(this).prop('checked')) {
				$(this).attr('checked', true);
			}
			else {
				$(this).attr('checked', false);

				// if even one checkbox is unchecked then uncheck select_all checkbox
				selectAll.prop('checked', false);
				selectAll.attr('checked', false);
			}

			var checkedElements = 0;

			// count how many elements are checked
			checkboxes.each(function(){
				if ($(this).attr('checked') && $(this).prop('checked') ){
					checkedElements++;
				}
			});

			// show delete button if there is at least one checked item
			if (checkedElements >= 1)
			{
				deleteButton.fadeIn(300);
			}
			else
			{
				deleteButton.fadeOut(300);
			}
		});

		deleteButton.on('click', function(){

			if(confirm(message)){
				$('form').submit();
			}
			else
			{
				return false;
			}
		});
	}
}


/**
 * shows or hides the page scroller
 */
function scroller(){
	var scrollElem = $('.scroll-top');
	var boodyHeight = $('body').height();
	var windowHeight = $(window).height();

	if (boodyHeight > windowHeight) {

		$( window ).on('scroll resize', function() {

			var scroll = $(window).scrollTop();

			// when scroll moves 10 pixel
			if (scroll > 10) {
				scrollElem.fadeIn(300);
			}
			else {
				scrollElem.fadeOut(300);
			}
		});
	}
}

/**
 * used to position page footer
 */
function footerPlacer(){
	var documentHeight = $(window).outerHeight();
	var contentHeight = $('#content').outerHeight();

	var headerHeight = $('#header-big').outerHeight();
	if (!headerHeight)	{
		headerHeight = $('#header-small').outerHeight();
	}

	var footerHeight = $('#footer').outerHeight();
	var top = 0;

	// this is the case when all content on the page is smaller then document window
	if ( documentHeight > (contentHeight + headerHeight + footerHeight) ){
		top = documentHeight - (contentHeight + headerHeight + footerHeight);
	}

	$('#footer').css({
		'top': top + 'px'
	})
}

/**
 * Colorizes all stars until the given star id
 */
function colorUntilStarID (id){

	for (j = 1; j <= id; j++){
		$('#'+j).css({
			'color': 'orange'
		});
	}
}

/**
 * makes all stars uncolored
 */
function uncolorAllStars () {
	$('.rating-stars .star').css({'color': 'gray'});
}

/**
 * hides all rating stars
 */
function hideAllRatingStarTexts() {

	$(ratingStarSelector).css({
		'display': 'none'
	});
}

/**
 * shows the given rating text by id
 */
function showRatingText(id) {

	if (id > 0){
		$('#r' + id).css({
			'display': 'block'
		});
	}
}