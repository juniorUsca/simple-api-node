const router = require('express').Router()
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
} = require('../components/users/domain/user')
const validationHandler = require('../utils/middlewares/validationHandler')
const { testAuth } = require('../components/users/controller')

router.get('/test', validationHandler(userIdSchema), testAuth)

module.exports = router
