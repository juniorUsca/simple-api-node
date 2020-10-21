const Joi = require('joi')

const userId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const userIdSchema = Joi.object({
  id: userId.required(),
})

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  isStore: Joi.string(),
})

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
}
