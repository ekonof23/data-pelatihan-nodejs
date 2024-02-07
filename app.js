const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8080;
const indexRouter = require('./controllers/index');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
// const dotenv = require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(dotenv);
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
