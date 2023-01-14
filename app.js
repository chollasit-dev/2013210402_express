var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var shopRouter = require('./routes/shop');
const staffRouter = require('./routes/staff');
const config = require('./config/index');

var app = express();
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://superdev:mRmoK0CDxft9FCje@2013210402-chollasit.ushw5qu.mongodb.net/restfulapi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});     //Password replace <password>

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));    //Define Image Size Limitation
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/staff', staffRouter);
app.use('/shop', shopRouter);

module.exports = app;
