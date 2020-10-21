const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const MONGO_URI = config.mongo.uri
const MONGO_DB = config.mongo.db

class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
    })
    this.dbName = MONGO_DB
  }

  /**
   * @return {Promise<import('mongodb').Db>} database
   */
  async connect () {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('connected succesfully to mongo')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (e) {
        MongoLib.connection = null
        // console.log('error connecting to database', e)
        throw e
      }
    }
    return MongoLib.connection
  }

  async getAll (collection, query) {
    const db = await this.connect()
    return db.collection(collection).find(query).toArray()
  }

  async get (collection, id) {
    const db = await this.connect()
    return db.collection(collection).findOne({ _id: ObjectId(id) })
  }

  async create (collection, data) {
    const db = await this.connect()
    const result = await db.collection(collection).insertOne(data)
    return result.insertedId
  }

  async update (collection, id, data) {
    const db = await this.connect()
    const result = db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    return result.upsertedId || id
  }

  async delete (collection, id) {
    const db = await this.connect()
    await db.collection(collection).deleteOne({ _id: ObjectId(id) })
    return id
  }
}

module.exports = MongoLib
