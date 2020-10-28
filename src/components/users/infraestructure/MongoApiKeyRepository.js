const MongoLib = require('../../../lib/mongo')

class MongoApiKeyRepository { // implement an interface
  constructor () {
    // super()
    this.collection = 'apiKeys'
    this.mongoDB = new MongoLib()
  }

  async getApiKey ({ token }) {
    return await this.mongoDB.get(this.collection, null, { token })
  }
}

module.exports = MongoApiKeyRepository
