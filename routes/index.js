var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(process.env.TEST_VAR);
  console.log("Main page has been requested.");
  res.render('index');
});

router.get('/resume', function(req, res, next) {
  console.log('Requesting PDF resume.');
  res.sendFile(path.join(__dirname, '../public/assets/files/', 'Resume(2016).pdf'));
});

router.post('/contact', function(req, res, next) {
  console.log("A contact form has been submitted.");
  //console.log(process.env.TEST_VAR);
  //console.log(req.body);
  //console.log(process.env.EMAIL_USERNAME);
  //console.log(process.env.EMAIL_PASSWORD);

  // Validation rules
  req.checkBody('name',
                'You must enter a name with at least two characters').isLength({ min: 2});

  req.checkBody('email',
                'Please enter a valid email').isEmail();

  req.checkBody('subject',
                'Please include a subject line that is at least two characters.').isLength({ min: 2});

  req.checkBody('reason',
                'Please include at least a few sentences about why you wish to contact me.'). isLength({ min: 2});

  // Check for validation errors
  var validationErrors = req.validationErrors();
  if(validationErrors) {
    // If errors were found
    console.log("Validation failed!");
    // Send back 400 status (error) and pass validation errors the the "Validation errors" key
    res.status(400).send({ "Validation errors" : validationErrors});
    return;
  } else {
    // No validation errors
    console.log("Validation passed.");

    // Config mail account
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    };
    // Instantiate mail transport agent
    var transporter = nodemailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        // sender address
        from: '"Portfolio contact form" <RBennett1106@gmail.com>',
        // list of receivers
        to: 'uptilt.io@gmail.com',
        // Subject line
        subject: req.body.subject,
        // html body
        html: '<p>' + req.body.name + ' wants to contact you via your portfolio contact form.</p>' +
              '<p>Message reads as follows:</p>' +
              '<p>' + req.body.reason + '</p>' +
              '<p> Contact email is listed as: ' + req.body.email + '</p>',
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            // Send error code to browser to halt processing
            return console.log(error);
            res.status(400).send({'Email error' : 'There was a problem with sending the email. Chances are I am already aware of it and am working on it.'});
            return;
        }
        // Message sent, continue with processing
        console.log('Message sent: ' + info.response);
    });
    // Everything was good, send OK to browser
    res.sendStatus(200);
    return;
  }
  // End contact route



});

module.exports = router;
