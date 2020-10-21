
/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUserRepository')} obj.UserRepository
 */
module.exports = ({ UserRepository }) => {
  return async () => { // parameters
    // verify parameters
    // check exist
    //
    return UserRepository.getAll()
    // notify?
  }
}
