var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.TEST_VAR);
  res.render('index');
});

router.post('/contact', function(req, res, next) {
  console.log(process.env.TEST_VAR);
  console.log(req.body);
  //console.log(process.env.EMAIL_USERNAME);
  //console.log(process.env.EMAIL_PASSWORD);

  req.checkBody('name',
                'You must enter a name with at least two characters').isLength({ min: 2});

  req.checkBody('email', 'Please enter a valid email').isEmail();

  req.checkBody('subject', 'Please include a subject line that is at least two characters.').isLength({ min: 2});

  req.checkBody('reason', 'Please include at least a few sentences about why you wish to contact me.'). isLength({ min: 2});

  var validationErrors = req.validationErrors();
  if(validationErrors) {
    console.log("Validation Errors!");
    console.log(validationErrors);
    res.send(400, { "Validation Errors" : validationErrors});
    return;
  } else {
    // No validation errors

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
            req.send(400);
            return console.log(error);
        }
        // Message sent, continue with processing
        console.log('Message sent: ' + info.response);
    });
    // Everything was good, send OK to browser
    res.send(200);
  }

  

});

module.exports = router;
