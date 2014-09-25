$(document).ready(function(){

	$('#from_date').datepicker();
	$('#to_date').datepicker();

	$('#from_time').timepicker({
		minuteStep: 10,
		showInputs: false,
		disableFocus: true,
		showMeridian: false,
		showSeconds: false,
		disableMousewheel: true,
		defaultTime: false//"current"
	});

	$('#to_time').timepicker({
		minuteStep: 10,
		showInputs: false,
		disableFocus: true,
		showMeridian: false,
		showSeconds: false,
		disableMousewheel: true,
		defaultTime: false//"current"
	});
});