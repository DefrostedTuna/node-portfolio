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
  console.log(process.env.EMAIL_USERNAME);
  console.log(process.env.EMAIL_PASSWORD);

  var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
      }
  };
  var transporter = nodemailer.createTransport(smtpConfig);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Uptilt Contact" <RBennett1106@gmail.com>', // sender address
      to: 'uptilt.io@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      html: '<h1>' + req.body.name + ' just submitted a contact request on uptilt.io</h1>' +
            '<p>Message reads as follows:</p>' +
            '<p>' + req.body.reason + '</p>' +
            '<p> Response email is listed as ' + req.body.email + '</p>',// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});

module.exports = router;
