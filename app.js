var express = require('express');
var path  = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


var app = express();
var port = 3000;


// MongoDB 접속
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log('mongodb connect');  
})
mongoose.connect('mongodb://127.0.0.1:27017/nodejs',{useMongoClient:true});

// View 엔진
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.send('첫번째 페이지')
});
//Routing
var admin = require('./routes/admin');
app.use('/admin', admin);

var contact = require('./routes/contact');
app.use('/contact', contact);


app.listen(port, function(){
    console.log('Express listening on port', port);
})

