const bcrypt = require('bcrypt')

/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAuthRepository')} obj.AuthRepository
 */
module.exports = ({ AuthRepository }) => {
  return async ({ email, password }) => {
    if (!email) throw new Error('validation failed')
    if (!password) throw new Error('validation failed')

    const auth = await AuthRepository.getByEmail({ email })
    if (!auth) return false
    if (!(await bcrypt.compare(password, auth.password))) return false

    delete auth.password

    return auth
  }
}
