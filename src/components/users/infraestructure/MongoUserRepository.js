const MongoLib = require('../../../lib/mongo')

class MongoUserRepository { // implement an interface
  constructor () {
    // super()
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async add ({ user }) {
    return this.mongoDB.create(this.collection, user)
  }

  async update ({ id, user }) {
    return this.mongoDB.update(this.collection, id, user)
  }

  async delete ({ id }) {
    return this.mongoDB.delete(this.collection, id)
  }

  async getById ({ id }) {
    return await this.mongoDB.get(this.collection, id)
  }

  async getAll () {
    const query = null
    return this.mongoDB.getAll(this.collection, query)
  }
}

module.exports = MongoUserRepository
