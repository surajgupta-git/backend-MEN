const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion1';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({  
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => { // promise if fulfilled return "dish" and hence we are logging that
        console.log(dish);

        return Dishes.findByIdAndUpdate( dish._id,
        {$set: { description: 'Updated test'} },
        { new: true }).exec();    // new:true implies it will return the updated one into dish
        
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.remove({});
        
    })
    .then(() => {

        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

});
