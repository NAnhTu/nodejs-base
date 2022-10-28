const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('dotenv').config()

const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/** Swagger Initialization - START */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
/** Swagger Initialization - END */

app.use('/api/auth', authRouter)

app.use('/api', indexRouter)
app.use('/api/users', usersRouter)

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
