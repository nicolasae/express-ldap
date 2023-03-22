// ************ Require's ************/
const createError = require('http-errors');
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');


// ************ Express() ************/
const app = express()

// ************ EJS *************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


/*** Main Router (require) */
const mainRoutes = require("./routes/mainRoutes")

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public/")));

// ************  Middlewares ************/
app.use(session({ 
    secret: 'secret ldap app',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }
));


/*** Main Router (use) */
app.use("/", mainRoutes);

/*** Error (404) */
app.use((req, res, next)=>{
    res.status(404).render('error404')
});


// ************ Servidor ************/
const port = 8080;
app.listen(process.env.PORT || port, () => {
    console.log(`Servidor corriendo en puerto ${port} - URL: http://localhost:${port}`)
});

module.exports = app;
