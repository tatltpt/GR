'use strict';

exports.name = 'models.share';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Share",
        new mongoose.Schema({
            from: String,
            to: String,
            note_id: String,
            note_content: String,
            createdAt: {
                type: String,
                required: false,
                default: Date.now
            }
        })
    );
};
