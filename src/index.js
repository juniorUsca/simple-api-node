// const passport = require('passport')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
// const path = require('path')
const app = express()

const errorHandler = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

const { config } = require('./config')
const authApi = require('./routes/auth')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(passport.initialize())
app.use(helmet())
// app.use(express.static(path.resole(__dirname, 'build')))

app.use('/api/auth', authApi)
// app.get('*', (req, res) => {
//   res.sendFile('build/index.html', { root: __dirname })
// })
// catch 404 and forward to error handler
app.use(notFoundHandler)

// middlewares
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`)
})
