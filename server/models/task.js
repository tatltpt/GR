'use strict';

exports.name = 'models.task';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Task",
        new mongoose.Schema({
            time: String,
            actionName: [{
                name: String,
                actions: [{
                    action: String,
                }],
                number: String,
            }],
        })
    );
};
