'use strict';

exports.name = 'models.group';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Group",
        new mongoose.Schema({
            name: String,
            number: String,
        })
    );
};
