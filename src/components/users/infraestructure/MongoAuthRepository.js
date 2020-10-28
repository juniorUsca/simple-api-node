const MongoLib = require('../../../lib/mongo')

class MongoAuthRepository { // implement an interface
  constructor () {
    // super()
    this.collection = 'auth'
    this.mongoDB = new MongoLib()
  }

  async add (user) {
    const _id = await this.mongoDB.create(this.collection, user)
    return { _id, ...user }
  }

  async update ({ id, user }) {
    return this.mongoDB.update(this.collection, id, user)
  }

  async delete ({ id }) {
    return this.mongoDB.delete(this.collection, id)
  }

  async getByEmail ({ email }) {
    return await this.mongoDB.get(this.collection, null, { email })
  }
}

module.exports = MongoAuthRepository
