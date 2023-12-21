/*
 * Project 2
 * app JavaScript code
 *
 * Authors: Denis Gracanin, Kirpa Kaur 
 * Version: 2.0
 */
 
// Required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// Initialize Express application
var app = express();
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Home route
app.get('/', (req, res) =>
    res.send('<h1>Project 2: kirpa</h1>') // Home web page
);

// MongoDB Schema
const CS3744Schema = require("./model");
const router = express.Router();
app.use('/db', router);

// Route to retrieve data from MongoDB
router.route('/find').get( async (req, res) => {
  const response = await CS3744Schema.find();
  return res.status(200).json(response);
});

// Route to update data in MongoDB based on ID
router.route('/update/:id').post((req, res) => {
  CS3744Schema.findById(req.params.id).then(function (item) {
      item.fileContent = req.body;
      item.save().then((item) => {
        res.json('File name updated!');
      });
    }
  );
});

// Route to create new data entry in MongoDB
router.route('/updatePost').post((req, res) => {
  CS3744Schema.create(req.body).then
      (item => {
        res.json(item)
        console.log(item);
      })
});


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

// Connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://student:cs3744@cluster0.trx2ejr.mongodb.net/CS3744');
mongoose.connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

// Start the Express application on port 3000
app.listen(3000, () => console.log("connecting to port"))

// Export the Express application
module.exports = app;
