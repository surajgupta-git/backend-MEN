const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion1';

const dboper = require('./operations1');

MongoClient.connect(url, (err, client) => {
    assert.equal(err,null);  //if err != null, program gets terminated , if err=null, continues
    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n", docs);
                            
                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);
                        client.close();
                    });
                });
            });
        });
    });
});