/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUserRepository')} obj.UserRepository
 */
module.exports = ({ UserRepository }) => {
  return async ({ email }) => {
    if (!email) throw new Error('validation failed')
    return UserRepository.getByEmail()
  }
}
