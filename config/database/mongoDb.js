const mongoclient = require('mongodb').MongoClient;
const config = require('config');

const connectionString = config.get("mongodb_local");
const defaultDocument = config.get("mongodb_local_defaultDoc");

let productsdb = null;
const client = new mongoclient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err)=> {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    productsdb = client.db(dbName);
    //client.close();
   });

