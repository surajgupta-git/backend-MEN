//uses PROMISES
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert'); 
// we no longer use assert as promises have Catching errors support

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion1';

const dboper = require('./operations');

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => { //invokes on fulfilling of promise
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes");

        })
        .then((result) => {  
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));  //invokes on rejection of promise

})
.catch((err) => console.log(err));