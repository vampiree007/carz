//////////////////////////////////////////////////////////////////////
// + Default Exports Are Handled Here/////////////////////////////////
//////////////////////////////////////////////////////////////////////
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

////////////////////////////////////////////////////

//Security Related Imports are handled here
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
///////////////////////////////////////////////////

//Folder Files Imports are handled Here
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const carRouter = require('./routes/carsRoutes');

///////////////////////////////////////////////////////////////////////////
// + SYSTEM RUNNING ITEMS ARE HANDLED HEREE////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Setting Express Function
const app = express();
//////////////////////////////////////////////////

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors())
}
///////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// + GLOBAL MIDDLEWARES ARE HANDLED HERE //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Serving static files
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static("client/build"));
//////////////////////////////////////////////////

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '90kb' }));
app.use(express.urlencoded({ extended: true, limit: '90kb' }));
app.use(cookieParser());
///////////////////////////////////////////////////

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
///////////////////////////////////////////////////

// Data sanitization against XSS Side Scripting
app.use(xss());
///////////////////////////////////////////////////

// All ROUTES Are Handled Here
app.use('/api/v1/users', userRouter);
app.use('/api/v1/car', carRouter);
////////////////////////////////////////////////////
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html")); // <- try "index.html"
});
app.use(globalErrorHandler);
module.exports = app;

