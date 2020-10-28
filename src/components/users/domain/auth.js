const Joi = require('joi')
const { apiKey } = require('./apiKey')

const auth = Joi.string().regex(/^Basic [0-9a-zA-Z-_.+/=]*$/)
const token = Joi.string().regex(/^Bearer [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)

const authSchema = Joi.object({
  authorization: auth.required(),
}).options({ allowUnknown: true })

const createAuthUserSchema = Joi.object({
  apiKeyToken: apiKey.required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const tokenSchema = Joi.object({
  authorization: token.required(),
}).options({ allowUnknown: true })

module.exports = {
  authSchema,
  createAuthUserSchema,
  tokenSchema,
}
