$(document).ready(function(){

	var document_height = $(window).outerHeight();
	var content_height = $('#content').outerHeight();

	var header_height = $('#header2').outerHeight();
	if (!header_height)	{
		header_height = $('#header').outerHeight();
	}

	var footer_height = $('#footer').outerHeight();

	var top = 0;

	console.log(document_height);
	console.log(content_height);
	console.log(header_height);
	console.log(footer_height);
	console.log(top);


	if ( document_height > content_height + header_height + footer_height ){

		top = document_height - content_height - header_height - footer_height + 'px';

		$('#footer').css({
			'top': top
		})
	}



	$(window).on('resize', function(){

		document_height = $(window).outerHeight();
		content_height = $('#content').outerHeight();

		header_height = $('#header2').outerHeight();
		if (!header_height)	{
			header_height = $('#header').outerHeight();
		}

		footer_height = $('#footer').outerHeight();

		top = 0;

		if ( document_height > content_height + header_height + footer_height ){

			top = document_height - content_height - header_height - footer_height + 'px';

			$('#footer').css({
				'top': top
			})
		}

	});
});
