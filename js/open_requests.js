/**
 * Created by Vahe Mikayelyan <vahemikayelyan85@gmail.com> 22/5/2014
 *
 * handles events: "Multiple request" is checked, "From date" date is picked
 * Changes content of "Repeat on" field based on date from selection
 */

$(document).ready(function(){

	var weekday_checkboxes = $('.ride-repetition input:checkbox'),
		repeat_checkbox = $('#repeat'),
		details_img = $('#details'),
		toggle_elements = $('.toggle-visibility'),
		date_from_input = $('#from_date'),
		date_to_input = $('#to_date');

	toggle_elements.hide();

	repeat_checkbox.prop('checked', false);
	repeat_checkbox.attr('checked', false);

	// makes current day of week checked
	dayOfWeekPicker(weekday_checkboxes);

	// shows additional options
	details_img.on('click', function(){

		toggle_elements.toggle(300, function(){

			if (toggle_elements.css('display') == 'none')
			{
				details_img.css('background-position', '0px 0px');
				details_img.attr('title', 'Show');
			}
			else
			{
				details_img.css('background-position', '0px -27px');
				details_img.attr('title', 'Hide');
			}
		});
	});


	// makes repeat checkbox checked
	repeat_checkbox.on('click', function(e){
		repeat_check(repeat_checkbox);
	});

	// watches ...
	date_from_input.on('change', function(e){
		e.stopPropagation();
		e.preventDefault();

		// change weekday checkboxes
		dayOfWeekPicker(weekday_checkboxes);

		// Set date to value equal to date from value
		dateToSetter(date_from_input, date_to_input);
	});


	function dateToSetter(date_from_input, date_to_input)
	{
		if (repeat_checkbox.prop('checked'))
		{
			var from = date_from_input.val().trim();
			date_to_input.val(from);
		}
	}

	function repeat_check(repeat_checkbox)
	{
		if (repeat_checkbox.prop('checked'))
		{
			repeat_checkbox.val('Y');
			//$('.ride-repetition, .occurrences').css({display: 'table-row'});
			$('.ride-repetition, .occurrences').toggle(300);
		}
		else
		{
			repeat_checkbox.val('N');
			$('.ride-repetition, .occurrences').css({display: 'none'});
		}
	}

	function dayOfWeekPicker(weekday_checkboxes)
	{
		var date_string = $('#from_date').val().trim();
		var time_string = $('#from_time').val().trim();

		var from_datetime = stringToISODate(date_string, time_string);

		// Calculate day of weeks
		// By default Sunday is 0, Monday is 1, and so on. We want that sunday be 7.
		var dayOfWeek = from_datetime.getDay();
		if (dayOfWeek == 0)
		{
			dayOfWeek = 7;
		}

		weekday_checkboxes.attr("checked", false);
		weekday_checkboxes.prop("checked", false);

		for (var i = 1; i <= weekday_checkboxes.length; i++ )
		{
			var curElement = $('.ride-repetition input#'+i);

			if (i == dayOfWeek)
			{
				curElement.attr("checked", true);
				curElement.prop("checked", true);
			}
		}
	}

	function stringToISODate(date_string, time_string)
	{
		if (!time_string)
		{
			time_string = '00:00:00';
		}

		// Convert 21 05 2014 to 2014-05-21
		var pattern = /(\d{2})\s+(\d{2})\s+(\d{4})/g;
		var match = pattern.exec(date_string);

		date_string = match[3] + '-' + match[2] + '-' + match[1];

		//Convert to ISO format 2011-05-21T11:51:00
		var ISO_from_datetime = date_string + 'T' + time_string;
		var from_datetime = new Date(ISO_from_datetime);

		return from_datetime;
	}

});