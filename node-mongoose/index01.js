const mongoose = require('mongoose');

const Dishes = require('./models/dishes0');

const url = 'mongodb://localhost:27017/conFusion1';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

        Dishes.create({name: 'Uthapizza', description: 'Test'}) // first callback(promise) method, hence no return keyword
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec();;
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {

            return mongoose.connection.close();
        })

        .catch((err) => {
            console.log(err);
        });
});