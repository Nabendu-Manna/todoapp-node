import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectionDB from './db/connectdb.js'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

var app = express()
const port = process.env.PORT || 8080
const DATABASE_URL = process.env.DATABASE_URL

// Database Connection
connectionDB(DATABASE_URL)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('**', (req, res) => {
  res.status(404).send({
    message: 'Invalid URL provided'
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`)
})