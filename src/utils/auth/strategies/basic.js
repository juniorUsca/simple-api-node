const createError = require('http-errors')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')

const MongoAuthRepository = require('../../../components/users/infraestructure/MongoAuthRepository')
const authByEmail = require('../../../components/users/application/authByEmail')

const AuthRepository = new MongoAuthRepository()

passport.use(new BasicStrategy(async function (email, password, cb) {
  // create service database
  const authByEmailQuery = authByEmail({ AuthRepository })

  try {
    console.log('--> MAKE LOGIN DATABASE <--', email, password)
    const authUser = await authByEmailQuery({ email, password })
    console.log('auth', authUser)
    if (!authUser) {
      return cb(createError.Unauthorized(), false)
    }
    return cb(null, authUser)
  } catch (error) {
    return cb(error)
  }
}))
