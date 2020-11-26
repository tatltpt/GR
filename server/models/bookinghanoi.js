'use strict';

exports.name = 'models.bookinghanoi';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Bookinghanoi",
        new mongoose.Schema({
            name: String,        
            comment: Array,         
            img: Array,
            roomtype: Array,
        })
    );
};
