const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const { config } = require('../../../config')

/**
 * verify apikey and generate token
 * @param {Object} obj
 * @param {import('../infraestructure/MongoApiKeyRepository')} obj.ApiKeyRepository
 */
module.exports = ({ ApiKeyRepository }) => {
  return async ({ user, apiKeyToken }) => {
    if (!apiKeyToken) throw createError.Unauthorized('apiKeyToken required')
    if (!user) throw createError.Unauthorized()

    const apiKey = await ApiKeyRepository.getApiKey({ token: apiKeyToken })
    if (!apiKey) throw createError.Unauthorized()

    const payload = {
      sub: user._id,
      email: user.email,
      scopes: apiKey.scopes,
    }

    return jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' })
  }
}
