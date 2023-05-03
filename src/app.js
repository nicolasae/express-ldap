// ************ Require's ************/
const createError = require('http-errors');
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors')
const multer = require('multer');


/*** Main Router (require) */
const mainRoutes = require("./routes/mainRoutes")

// ************ Express() ************/
const app = express()

// ************ EJS *************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, "../public/")));

// ************  Middlewares ************/
app.use(session({ 
  secret: 'secret ldap app',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60 * 50000 
  }
}));


/*** Main Router (use) */
app.use("/", mainRoutes);

/*** Error (404) */
app.use((req, res, next)=>{
    res.status(404).render('error404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error404');
});

// ************ Servidor ************/
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

module.exports = app;
