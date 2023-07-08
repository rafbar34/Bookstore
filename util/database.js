const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const user = process.env.MONGO_USER;
const restURL = process.env.MONGO_LINK;
const url = `mongodb+srv://${user}:${password}${restURL}`;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      console.log('connect');
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
