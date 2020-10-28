const Joi = require('joi')

const apiKey = Joi.string().regex(/^[0-9a-fA-F]+$/)

const apiKeySchema = Joi.object({
  apiKeyToken: apiKey.required(),
})

module.exports = {
  apiKey,
  apiKeySchema,
}
