const createError = require('http-errors')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { config } = require('../../../config')

require('../../../utils/auth/strategies/basic')

/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoApiKeyRepository')} obj.ApiKeyRepository
 */
module.exports = ({ ApiKeyRepository }) => {
// receive req, res, next just to use passport
  return async (/** @type {import('express').Request} */ req,
    /** @type {import('express').Response} */res,
    /** @type {import('express').NextFunction} */next) => {
    const { apiKeyToken } = req.body
    if (!apiKeyToken) throw createError.Unauthorized('apiKeyToken required')
    return new Promise((resolve, reject) => {
      passport.authenticate('basic', { session: false }, (error, user, challenge) => {
        if (error) return reject(error)
        if (challenge) {
          res.setHeader('WWW-Authenticate', challenge)
          return reject(createError.Unauthorized())
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return reject(error)

          try {
            const apiKey = await ApiKeyRepository.getApiKey({ token: apiKeyToken })
            if (!apiKey) {
              console.log('invalid apiKeyToken')
              return reject(createError.Unauthorized())
            }
            const payload = {
              sub: user._id,
              email: user.email,
              scopes: apiKey.scopes,
            }
            const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' })
            resolve({
              token,
              user,
            })
          } catch (err) {
            reject(err)
          }
        })
      })(req, res, next)
    })
  }
}
