const getAllUsers = require('./application/getAllUsers')
const MongoUserRepository = require('./infraestructure/MongoUserRepository')

const userService = new MongoUserRepository()

/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const testAuth = async (_, res, next) => {
  try {
    const query = getAllUsers(userService)
    const users = await query()
    res.status(200).json({
      data: users,
      message: 'Users listed',
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  testAuth,
}
