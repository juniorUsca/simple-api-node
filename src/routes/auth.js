const router = require('express').Router()
const passport = require('passport')

const validationHandler = require('../utils/middlewares/validationHandler')
const jwtAuthentication = require('../utils/middlewares/jwtAuthentication')
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler')
const { apiKeySchema } = require('../components/users/domain/apiKey')
const {
  authSchema,
  createAuthUserSchema,
  tokenSchema,
} = require('../components/users/domain/auth')
const { testAuth, signIn, signInBasic, signUp, signUpBasic } = require('../components/users/controller')

require('../utils/auth/strategies/basic')
require('../utils/auth/strategies/jwt')

router.get(
  '/test',
  validationHandler(tokenSchema, 'headers'),
  passport.authenticate('jwt', { session: false, failWithError: true }),
  scopesValidationHandler(['read:auths']),
  testAuth,
)
router.get(
  '/test2',
  validationHandler(tokenSchema, 'headers'),
  jwtAuthentication,
  scopesValidationHandler(['read:stores']),
  testAuth,
)
router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post(
  '/signIn',
  validationHandler(authSchema, 'headers'),
  validationHandler(apiKeySchema),
  passport.authenticate('basic', { session: false, failWithError: true }),
  signInBasic,
)
router.post(
  '/signUp',
  validationHandler(createAuthUserSchema),
  signUpBasic,
)

module.exports = router
