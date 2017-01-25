// =======================
// get the packages we need ============
// =======================
const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const mongoose    = require('mongoose')
const session     = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore  = require('connect-mongo')(session)
const routes      = require('./routes/')
const jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require('./config') // get our config file
const User   = require('./models/user') // get our mongoose model
const passport = require('passport')
// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8000 // used to create, sign, and verify tokens
const server = require('http').Server(app)
mongoose.Promise = global.Promise
mongoose.connect(config.database) // connect to database
app.set('superSecret', config.secret) // secret variable

app.use(express.static('public'))

// use body parser so we can get info from POST and/or URL parameters
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

app.use(session({
  store: sessionStore,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(passport.initialize())
// app.use(passport.session())
// use morgan to log requests to the console
app.use(morgan('dev'))
// =======================
// start the server ======
// =======================
app.get('/', (req, res) => {
    return res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use('/api', routes(express))

server.listen(port)
console.log('Magic happens at http://localhost:' + port)