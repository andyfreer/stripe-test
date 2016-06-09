var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var stripe = require('stripe')('...');

var app = express();

// BodyParser for getting POST/GET params
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/charge', function(req, res) {

    console.log('charge...');

    var stripeToken = req.body.stripeToken;
    var amount = 1000;

    stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: amount
        },
        function(err, charge) {

            console.log('err:' + err);
            console.log('charge:' + JSON.stringify(charge));

            if (err) {
                res.send(500, err);
            } else {
                res.send(204);
            }
        });

});

var port = 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});