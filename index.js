//imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

//set static folder
app.use('/public', express.static('public'));

//use handlebars
app.set('view engine', 'hbs');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//configure AWS SDK
aws.config.loadFromPath('config.json');
const ses = new aws.SES({apiVersion: '2010-12-01'})
const to = ['pcomo24@gmail.com']
const from = 'pcomo24@gmail.com';

//Routing
app.get('/', function (req, res) {
    res.render('home.hbs')
});

//post from form on home.hbs
app.post('/sendMsg', function (req, res) {
    let msgName = req.body.name;
    let msgPhone = req.body.phone;
    let msgEmail = req.body.email;
    let msgMsg = req.body.msg;
    let dataTemp = `<h4>NAME: ${msgName}</h4><h4>EMAIL: ${msgEmail}</h4><h4>PHONE: ${msgPhone}</h4>
                    <h4>MSG: </h4><p>${msgMsg}</p>`;

    //AWS SDK mailer
    ses.sendEmail( {
        Source: from,
        Destination: { ToAddresses: to },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Message from portfolio'
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: dataTemp
               },
            }
        }
    }, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
    res.redirect('/');
});

//set server location here
app.listen(8500, function () {
    console.log('your portfolio page is running on 8500')
});
