var $submitRequest = $('#submit-request');

$submitRequest.click(function() {

    console.log("clicked");

    var $phoneNumberInput = $('#digits').val();
    var $imageInput = $('#image-search-terms').val();

    $.ajax({

        url: '/pixabay/' + $imageInput,
        method: 'GET',
    }).done(function(data){

        // this returns on object of which "hits" gives an array of image objects.
        var parsedData = JSON.parse(data);

        console.log(parsedData["hits"].length);

        for (var i = 0; i < parsedData["hits"].length; i++) {

        sendText(parsedData["hits"], $phoneNumberInput, i);

        }

    });

    alertSuccess();

});

function sendText(imageDataArray, num, count) {

    $.ajax({

        url:'/twilio',
        data: {
            num : num,
            image_url : imageDataArray[count]['webformatURL']
        },
        method: 'POST'
        }).done(function(data) {

            console.log(data);

        });

}

function alertSuccess () {

    swal({
        title: "Messages sent!",
        text: "Now watch your fwends get confused.",
        type: "success",
        allowOutsideClick: true,
        timer: 3000,
        confirmButtonColor: "#FF842D"
    });

    $('#digits').val("");
    $('#image-search-terms').val("");

}
