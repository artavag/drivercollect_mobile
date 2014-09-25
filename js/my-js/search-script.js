var uri = 'http://drivercollect.loc/mylocations/find';
var inputElem = '.address';
var foundAddressesUl = '';

$(document).ready(function(){

	$(inputElem).on('focus click', function(e){
		e.stopPropagation();

		foundAddressesUl = '.' + $(this).attr('data-direction');

		hideFoundAddresses();
		showFoundAddresses($(this));
	});

	$('body').on('click', function(g){
		$('[class^="location-ul-"], [class*=" location-ul-"]').hide();
	});

	var dateObject2 = null;
	var keyPressTime2 = null;

	//$(inputElem).on('keypress keydown keyup paste cut input', function(e){
	$(inputElem).on('keydown paste cut', function(e){

		e.stopPropagation();

		if ($(this).val().length < 1 || $(foundAddressesUl + ' li').length < 1){
			//$(foundAddressesUl).hide();

			// todo check if correct ot hide all uls
			hideFoundAddresses();
		}

		var dateObject = new Date();
		var keyPressTime = dateObject.getTime();

		$(inputElem).on('keydown', function(d){
			d.stopPropagation();
			dateObject2 = new Date();
			keyPressTime2 = dateObject2.getTime();
		});

		var timeDiff = Math.abs(keyPressTime - keyPressTime2);
		var address_input = $(inputElem).val();

//		if(address_input.length >= 1 && timeDiff > 300) // the correct one
		if(address_input.length >= 1000000 && timeDiff > 300)
		{
			$.ajax({
				url: uri,
				crossDomain: true,
				type: 'post',
				data: {
					address: address_input
				},
				success: function(data){

					$(foundAddressesUl).empty();

					//$(foundAddressesUl).hide();

					// todo check if correct ot hide all uls
					hideFoundAddresses();

					if (data.length > 2)
					{
						$(foundAddressesUl).showFoundAddresses($(this));
					}

					var addressesNominatim = $.parseJSON(data);
					addressesNominatim.forEach(addressBuilder);

					$('.address-single').on('click', function(e){
						e.stopPropagation();
						setInputs(e.delegateTarget.id, addressesNominatim);
					});

					return false;
				}
			});
		}
	});
});



// displays found addresses
function showFoundAddresses(triggerElem){

	// get height of input element
	var height = $(inputElem).outerHeight();

	if ( $(foundAddressesUl + ' li').length > 0 && triggerElem.val().length > 0 ) {

		$(foundAddressesUl).css({
			'display': 'block',
			'top': (height + 2) + 'px',
			'left': 0
		});
	}
}


// hides found addresses
function hideFoundAddresses(){
	$('[class^="location-ul-"], [class*=" location-ul-"]').hide();
}

function addressBuilder(element, index, array){

	var name = element.display_name;
	var elementHtml = '<li class="address-single" id="' + element.place_id + '">' + name + '</li>';

	if (name && name.length > 0)
	{
		$(foundAddressesUl).append(elementHtml);
	}
}

function setInputs(id, datas)
{
	for (var i=0; i < datas.length; i++)
	{
		if (datas[i].place_id == id)
		{
			$('input[name="place_id"]').val(datas[i].place_id);
			$('input[name="country"]').val(datas[i].address.country_code.toUpperCase());
			$('input[name="town"]').val(datas[i].address.city);
			$('input[name="street"]').val(datas[i].address.road);
			$('input[name="lat"]').val(datas[i].lat);
			$('input[name="lon"]').val(datas[i].lon);
			$('input[name="label"]').val(datas[i].display_name);
			$('input[name="address"]').val(datas[i].display_name);

			$(foundAddressesUl).hide();
			break;
		}
	}
}