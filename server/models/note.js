"use strict";

exports.name = "models.note";

exports.requires = ["@mongoose"];

exports.factory = function (mongoose) {
  return mongoose.model(
    "Note",
    new mongoose.Schema({
      folderID: String,
      detail:{ type : Array , default : [] },
      content: String,
      version: String,
      createdAt: {
        type: String,
        required: false,
        default: Date.now,
      },
      pinToTop: {
        type: Boolean,
        require: false,
        default: false,
      },
      isLocked: {
        type: Boolean,
        require: false,
        default: false,
      },
      password: {
        type: String,
        required: false,
        default: "",
      },
      folders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Folder",
        },
      ],
    })
  );
};
