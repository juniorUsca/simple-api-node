const createError = require('http-errors')

module.exports = (_, __, next) => {
  next(createError(404))
}
