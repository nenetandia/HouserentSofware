const express = require('express')
const exphbs = require('express-handlebars')
const path = require ('path')
const session = require('express-session')
const MYSQLSTORE = require('express-mysql-session')(session)
const app = express()
const connection = require('./config/dbConnect')
require('dotenv').config()

let sessionStore = new MYSQLSTORE({}, connection);
app.use(session({
    key : process.env.SITEWEBCOOKIE_NAME, 
    secret : process.env.SECRET,
    store : sessionStore, 
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge: 1000 * 60 * 60 * 8
    }
}))

const hbs = exphbs.create({
    defaultLayout : 'main', 
    extname : '.hbs',
    helpers : require('./services/helpers')
})
app.use(express.json());
app.use(express.urlencoded({extends : true}));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public/')))


app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))

app.use(function (req, res) {
    res.render('errors/404', {layout : false})
})

const port = process.env.PORT

app.listen(port, console.log(`app running on port : ${port}`))