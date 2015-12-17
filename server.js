// Thank you Thom Page (github.com/singular000) for the setup starter code!

// DEPENDENCIES

var express      = require('express'),
    bodyParser   = require('body-parser'),
    twilio       = require('twilio'),
    request      = require('request');

var port         = process.env.PORT || 3000;
var app          = express();

// MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

// LISTENER

app.listen(port);

// THIRD PARTY APIS

var pixabayKey   = process.env.PIXABAY_API_KEY;

// ROUTES

// Route for making a request to Pixabay's API
app.get('/pixabay/:image_search_words', function(req, res, next) {

  request('https://pixabay.com/api/?key=' + pixabayKey + "&q=" + req.params.image_search_words + "&image_type=photo&pretty=true", function (error, response, body) {

        if (!error && response.statusCode == 200) {

            res.send(body);

        }

    });

});

// Route for making a request to Twilio's API
app.post('/twilio', function(req, res, next) {

    var client = new twilio.RestClient(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    // console.log(req.body);

    // Send an SMS text message
    client.sendMessage({

        to: '+1' + req.body.num,
        from: '+19177468848',
        body: req.body.message,
        mediaUrl: req.body.image_url

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) {

            console.log("from: ", responseData.from);
            console.log("to: ", responseData.to);
            console.log("message: ", responseData.body);
            console.log("image url: ", responseData.mediaUrl);
            res.send(responseData.to);

        }


    });

});



