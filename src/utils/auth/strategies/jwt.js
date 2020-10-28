const createError = require('http-errors')
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const { config } = require('../../../config')
const MongoAuthRepository = require('../../../components/users/infraestructure/MongoAuthRepository')
const existAuthByEmail = require('../../../components/users/application/existAuthByEmail')

passport.use(new Strategy({
  secretOrKey: config.authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // ignoreExpiration: true,
}, async function (tokenPayload, cb) {
  // create service database
  const AuthRepository = new MongoAuthRepository()
  const existAuthByEmailQuery = existAuthByEmail({ AuthRepository })

  try {
    console.log('--> MAKE VERIFICATION DATABASE <--')
    const { email } = tokenPayload
    const authUser = await existAuthByEmailQuery({ email })
    if (!authUser) return cb(createError.Unauthorized(), false)

    return cb(null, { ...authUser, scopes: tokenPayload.scopes })
  } catch (error) {
    return cb(error)
  }
}))
