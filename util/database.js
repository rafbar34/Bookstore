const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const user = process.env.MONGO_USER;
const restURL = process.env.MONGO_LINK;
const url = `mongodb+srv://${user}:${password}${restURL}`;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      console.log('connect');
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
