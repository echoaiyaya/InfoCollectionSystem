var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AbD7hZKzJu3hLrmbD3tZEOKlgz9GinGHjRD9dVQHJBECCpqouMQQPJyuh1CvlsgY_p1a-r89fByNPAn9',
  'client_secret': 'EIrnnv4DvJMFuZfquM0peGgmVU4QFshJfTMQNWR0By7yMFy902VnrvrUcRyOFY1NplZo1nrbVoeObpjL'
});
require('./APP_SERVER/models/db');

var mongoose = require('mongoose');

var indexRouter = require('./APP_SERVER/routes/index');
var usersRouter = require('./APP_SERVER/routes/users');
var adminRouter = require('./APP_SERVER/routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'APP_SERVER', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "secret"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.post('/donation',(req, res) => {
  console.log(req.body.data_5);

  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
          "items": [{
              "name": "Donation",
              "sku": "001",
              "price": req.body.data_5,
              "currency": "CAD",
              "quantity": 1
          }]
      },
      "amount": {
          "currency": "CAD",
          "total": req.body.data_5
      },
      "description": "THANK YOU FOR YOUR DONATION"
  }]

};

paypal.payment.create(create_payment_json, function (error, payment){
  if(error){
    throw error;
  } else {
    for(let i = 0;i < payment.links.length;i++){
      if(payment.links[i].rel === 'approval_url'){
        res.redirect(payment.links[i].href);
      }
    }
  }
});
});
app.get('/success', (req,res) => {
  var payerId = req.query.PayerID;
  var paymentId = req.query.paymentId;

  var execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "CAD",
            "total": "25.00"
        }
    }]
  };
  
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        // console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.send('/');
    }
});
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
