const createError = require('http-errors')
const bcrypt = require('bcrypt')

/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAuthRepository')} obj.AuthRepository
 * @param {import('../infraestructure/MongoUserRepository')} obj.UserRepository
 */
module.exports = ({ AuthRepository, UserRepository }) => {
  return async ({ email, password }) => { // parameters
    // verify parameters
    if (!email) throw new Error('validation failed')
    if (!password) throw new Error('validation failed')
    // check exist
    let authUser = await AuthRepository.getByEmail({ email })
    if (authUser) throw createError.Forbidden('User alredy exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    authUser = await AuthRepository.add({ email, password: hashedPassword })
    const user = await UserRepository.add({
      _id: authUser._id,
      email,
      name: '',
      lastName: '',
      phone: '',
      isStore: false,
    })
    return user
  }
}
