const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { config } = require('../../../config')

/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoApiKeyRepository')} obj.ApiKeyRepository
 * @param {import('../infraestructure/MongoAuthRepository')} obj.AuthRepository
 * @param {import('../infraestructure/MongoUserRepository')} obj.UserRepository
 */
module.exports = ({ ApiKeyRepository, AuthRepository, UserRepository }) => {
  return async ({ email, password, apiKeyToken, login }) => { // parameters
    // verify parameters
    if (!email) throw new Error('validation failed')
    if (!password) throw new Error('validation failed')
    if (!apiKeyToken) throw createError.Unauthorized('apiKeyToken required')

    // check exist
    let authUser = await AuthRepository.getByEmail({ email })
    if (authUser) throw createError.Forbidden('User alredy exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    authUser = await AuthRepository.add({ email, password: hashedPassword })
    const user = await UserRepository.add({
      _id: authUser._id,
      email,
      name: '',
      lastName: '',
      phone: '',
      isStore: false,
    })

    const asyncLogin = (user) => new Promise((resolve, reject) => {
      login(user, { session: false }, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
    delete authUser.password
    await asyncLogin(authUser)

    const apiKey = await ApiKeyRepository.getApiKey({ token: apiKeyToken })
    if (!apiKey) {
      console.log('invalid apiKeyToken')
      throw createError.Unauthorized()
    }

    const payload = {
      sub: user._id,
      email: user.email,
      scopes: apiKey.scopes,
    }
    return jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' })
  }
}
