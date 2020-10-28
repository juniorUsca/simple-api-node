const MongoAuthRepository = require('./infraestructure/MongoAuthRepository')
const MongoUserRepository = require('./infraestructure/MongoUserRepository')
const MongoApiKeyRepository = require('./infraestructure/MongoApiKeyRepository')
const getAllUsers = require('./application/getAllUsers')
const signInUser = require('./application/signInUser')
const ucSignInBasic = require('./application/signInBasic')
const signUpUser = require('./application/signUpUser')
const ucSignUpBasic = require('./application/signUpBasic')

const AuthRepository = new MongoAuthRepository()
const UserRepository = new MongoUserRepository()
const ApiKeyRepository = new MongoApiKeyRepository()

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const testAuth = async (req, res, next) => {
  try {
    const query = getAllUsers({ UserRepository })
    const users = await query()
    console.log('user!!', req.user)
    res.status(200).json({
      data: users,
      message: 'Users listed',
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signIn = async (req, res, next) => {
  try {
    const query = signInUser({ ApiKeyRepository })
    const { token, user } = await query(req, res, next)
    res.status(200).json({
      data: {
        token,
        user,
      },
      message: 'Users signIn',
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signInBasic = async (req, res, next) => {
  try {
    const query = ucSignInBasic({ ApiKeyRepository })
    const { user } = req
    const { apiKeyToken } = req.body
    const token = await query({ user, apiKeyToken })
    res.status(200).json({
      data: {
        token,
        user,
      },
      message: 'User signIn',
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signUp = async (req, res, next) => {
  try {
    const query = signUpUser({ AuthRepository, UserRepository })
    const user = await query(req.body)
    res.status(200).json({
      data: {
        user,
      },
      message: 'User signUp',
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signUpBasic = async (req, res, next) => {
  try {
    const query = ucSignUpBasic({ ApiKeyRepository, AuthRepository, UserRepository })
    const { email, password, apiKeyToken } = req.body
    let { login } = req
    login = login.bind(req)
    const token = await query({ email, password, apiKeyToken, login, req })
    const { user } = req // get user after register and login

    res.status(200).json({
      data: {
        token,
        user,
      },
      message: 'User signUp',
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  testAuth,
  signIn,
  signInBasic,
  signUp,
  signUpBasic,
}
