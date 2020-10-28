const createError = require('http-errors')

/**
 * @param {Array<string>} allowedScopes If has any of the allowedScopes, its ok
 **/
module.exports = (allowedScopes) => {
  return (req, _, next) => {
    if (!req.user || (req.user && !req.user.scopes)) next(createError.Unauthorized('missing scopes'))

    const hasAccess = allowedScopes.find(allowedScope => req.user.scopes.includes(allowedScope))

    if (hasAccess) next()
    else next(createError.Unauthorized('Insufficient scopes'))
  }
}
