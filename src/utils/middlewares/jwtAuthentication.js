const createError = require('http-errors')
const passport = require('passport')

require('../auth/strategies/jwt')

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, challenge) => {
    // console.log(error, user, challenge)
    if (error) return next(error)
    if (challenge) {
      if (typeof challenge === 'object') challenge = challenge.message
      res.setHeader('WWW-Authenticate', challenge)
      return next(createError.Unauthorized())
    }

    if (!user) return next(createError.Unauthorized())

    req.login(user, { session: false }, (error) => {
      if (error) return next(error)
      next()
    })
  })(req, res, next)
}
