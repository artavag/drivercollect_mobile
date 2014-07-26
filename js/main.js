$(document).ready(function(){

	var a = $(document).outerHeight();
	var b = $('#content').outerHeight();
	var c = $('#header2').outerHeight();
	var d = $('#footer').outerHeight();

	var top = 0;

	if ( b + c + d < a ){
		top = a - (b + c ) - d + 'px';

//		console.log(a);
//		console.log(b);
//		console.log(c);
//		console.log(top);

		$('#footer').css({
			'position': 'relative',
			'top': top
		})
	}



	$(window).on('resize', function(){

		a = $(document).outerHeight();
		b = $('#content').outerHeight();
		c = $('#header2').outerHeight();
		d = $('#footer').outerHeight();

		top = 0;

		if ( b + c + d < a ){
			top = a - (b + c) - d + 'px';

			$('#footer').css({
				'top': top
			})
		}


	});
});
