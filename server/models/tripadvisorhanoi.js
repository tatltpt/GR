'use strict';

exports.name = 'models.tripadvisorhanoi';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Tripadvisorhanoi",
        new mongoose.Schema({
            name: String,
            district: String,
            place: String,
            comment: Array,
            convenient: Array,
            img: Array,
            review: Array,
            roomtype: Array,
        })
    );
};
