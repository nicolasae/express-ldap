const express = require('express')
const path = require('path');
const cors = require('cors');

/*** CORS */
const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

/*** Main Router (require) */
const mainRoutes = require("./routes/mainRoutes")


// ************ Express() ************/
const app = express()


// ************  Middlewares ************/

app.use(express.static(path.join(__dirname, "../public/")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)) // Use this after the variable declaration


// ************ EJS *************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

/*** Main Router (use) */
app.use("/", mainRoutes);
// routers
// app.use('/api', UserRoutes)


// ************ Servidor ************/
const port = 8080;
app.listen(process.env.PORT || port, () => {
    console.log(`Servidor corriendo en puerto ${port} - URL: http://localhost:${port}`)
});

module.exports = app;
