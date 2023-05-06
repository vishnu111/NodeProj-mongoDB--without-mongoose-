const mongodb = require("mongodb");
const { get } = require("../routes/admin");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://vishnulokesh520:iQwy9NGBi0qPLdOo@cluster0.qrh1euo.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("CONNECTED");
      _db = client.db();
      callback();
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
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
