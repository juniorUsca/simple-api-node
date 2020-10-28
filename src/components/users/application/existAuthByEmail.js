/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAuthRepository')} obj.AuthRepository
 */
module.exports = ({ AuthRepository }) => {
  return async ({ email }) => {
    if (!email) throw new Error('validation failed')
    const auth = await AuthRepository.getByEmail({ email })
    if (!auth) return false

    delete auth.password

    return auth
  }
}
