"use strict";

exports.name = "controllers.note";

exports.requires = ["@lodash", "models.note"];

exports.factory = function (_, Note) {
  const getNotes = (req, res, next) => {
    const folderID = req.params.folderId;
    Note.find({ folderID }, null, { sort: { pinToTop: -1, createdAt: -1 } }, function (
      err,
      notes
    ) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ notes });
    });

  };

  const getAllNotes = (req, res, next) => {

    Note.find({}, null, { sort: { createdAt: -1 } }, function (
      err,
      notes
    ) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ notes });
    });
  };

  const milisecondToDate = (mili) => {
    const date = new Date(+mili);
    return date.toLocaleDateString();
  };

  const getNoteById = (req, res, next) => {
    const _id = req.params.noteId;
    Note.findOne({ _id }, function (err, note) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ note });
    });
  };

  const newNote = (req, res, next) => {
    const {folderID, content, version} = _.get(req, "body", "");
    const note = new Note();
    note.detail.push({content: content, version: version});
    new Note({
      folderID: folderID,
      detail: note.detail,
      content: content,
      version: version,
    }).save(function (err, note) {
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ note });
    });
  };

  const updateNote = (req, res, next) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.noteId;

    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Note with id=${id}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Note was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Note with id=" + id,
        });
      });
  };
  const pinNoteToTop = (req, res, next) => {
    const noteId = req.params.noteId;
    Note.findByIdAndUpdate(noteId, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot pin note with id=${noteId} to top. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Note was pined successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error pin Note with id=" + noteId,
        });
      });
  }

  const deleteNote = (req, res, next) => {
    const id = req.params.noteId;
    Note.findByIdAndRemove(id)
      .exec()
      .then(() =>
        res.status(204).json({
          success: true,
        })
      )
      .catch((err) =>
        res.status(500).json({
          success: false,
        })
      );
  };

  const moveNote = (req, res, next) => {
    const noteId = req.params.noteId;
    Note.findByIdAndUpdate(noteId, req.body, {useFindAndModify: false})
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot move note with id=${noteId} to top. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: `Note with id=${noteId} was move successfully.` });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error move Note with id=" + noteId,
        });
      });
  }

  return {
    getNotes,
    newNote,
    updateNote,
    deleteNote,
    pinNoteToTop,
    getAllNotes,
    getNoteById,
    moveNote
  };
};
