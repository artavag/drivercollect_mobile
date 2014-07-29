	jQuery(document).ready(function($) {

	    var uri_google = 'mylocations/find_google';

        function addressBuilder_google(element, index, array){

            var name = element.description;
            var id = element.reference;

            //console.log(name);

            var elementHtml = '<li class="address_single" id="' + id + '" style="font-size: 12px;margin: 3px; cursor: pointer;border-bottom: solid 1px #ccc;">' + name + '</li>';

            if (name && name.length > 0)
            {
                $('ul#abc_google').append(elementHtml);
            }
        }

        function setInputs_google(ref, datas)
        {
//            var url = 'https://maps.googleapis.com/maps/api/place/details/json?'
//            + 'reference= '+ ref +'&key=AIzaSyAObuOMULf996Uzt-xKxUuM1I-w8bTHDrA';
//
//            $.get( url, function(result){
//                console.log(result);
//            });

            $.ajax({
                url: 'mylocations/detail',
                type: 'post',
                data: {
                    ref: ref
                },
                success: function(data){

                    var datas = $.parseJSON(data);


                    if (datas.result)
                    {
                        $('input[name="place_id_google"]').val(datas.result.place_id);
//                        $('input[name="country_google"]').val(datas.address.country_code.toUpperCase());
//                        $('input[name="town_google"]').val(datass.address.city);
//                        $('input[name="street_google"]').val(datas.result.address.road);

                        $('input[name="lat_google"]').val(datas.result.geometry.location.lat);
                        $('input[name="lon_google"]').val(datas.result.geometry.location.lng);

                        $('input[name="label_google"]').val(datas.result.formatted_address);

                        $('input[name="address_google"]').val(datas.result.formatted_address);

                        $('ul#abc_google').hide();
                    }

                    return false;
                }
            });


        }

        $('#address_google').on('focus click', function(e){


            if ( $('ul#abc_google li').length > 0 && $(this).val().length > 0 )
            {
                $('ul#abc_google').show();
            }

        }).on('blur', function(e){
            e.stopPropagation();

            $('body').on('mouseup', function(){
                $('ul#abc_google').hide();
            });
        });

        var dateObject22 = null;
        var keyPressTime22 = null;

        //$('#address_google').on('keypress keydown keyup paste cut input', function(e){
        $('#address_google').on('keydown paste cut', function(e){

            e.stopPropagation();

            if ($(this).val().length < 1 || $('ul#abc_google li').length < 1){
                $('ul#abc_google').hide();
            }

            var dateObject1 = new Date();
            var keyPressTime1 = dateObject1.getTime();

            $('#address_google').on('keydown', function(d){
                d.stopPropagation();
                dateObject22 = new Date();
                keyPressTime22 = dateObject22.getTime();
            });

            var timeDiff = Math.abs(keyPressTime1 - keyPressTime22);
            var address_input = $('#address_google').val();

            if(address_input.length >= 1 && timeDiff > 300)
            {
                $.ajax({
                    url: uri_google,
                    type: 'post',
                    data: {
                        address_google: address_input
                    },
                    success: function(data){

                        $('ul#abc_google').empty();
                        $('ul#abc_google').hide();

                        if (data && data.length > 2)
                        {
                            $('ul#abc_google').show();

                            var addressesNominatim = $.parseJSON(data);

//                            console.log(addressesNominatim.predictions[0].description);return;

                            addressesNominatim.predictions.forEach(addressBuilder_google);

                            $('.address_single').on('click', function(e){
                                e.stopPropagation();
                                setInputs_google(e.delegateTarget.id, addressesNominatim);
                            });
                        }

                        return false;
                    }
                });
            }


        });



    });
