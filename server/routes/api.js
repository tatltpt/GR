"use strict";

exports.name = "routes.api";

exports.requires = ["@express", "controllers.folder", "controllers.note", "controllers.share", "controllers.group", "controllers.task"];

exports.factory = function (express, folderController, noteController, shareController, groupController, taskController) {
    let router = express.Router();

    router.get("/folders", folderController.getFolders);
    router.post("/folders", folderController.newFolder);
    router.put("/folders/:folderId", folderController.updateFolder);
    router.get("/folders/:folderId", folderController.getFolderById);
    router.delete("/folders/:folderId", folderController.deleteFolder);
    router.get("/folder/:user", folderController.getFolderByUser);

    router.get("/notes/:folderId", noteController.getNotes);
    router.post("/notes", noteController.newNote);
    router.get("/note/:noteId", noteController.getNoteById);
    router.get("/notes", noteController.getAllNotes);
    router.put("/notes/:noteId", noteController.updateNote);
    router.put("/notes/:noteId", noteController.pinNoteToTop);
    router.post("/notes/:noteId", noteController.moveNote);
    router.delete("/notes/:noteId", noteController.deleteNote);

    router.get("/shares", shareController.getAllShares);
    router.get("/share/:shareId", shareController.getShareById);
    router.post("/share", shareController.newShare);
    router.get("/shares/:user",shareController.getShareByUser);
    router.delete("/share/:shareId", shareController.deleteShare);

    router.get("/groups", groupController.getAllGroupName);
    router.post("/groups", groupController.newGroup);

    router.post("/tasks", taskController.newTask);
    router.get("/task", taskController.getAll);
    router.get("/tasks", taskController.getAllTask);
    router.put("/tasks", taskController.addActionName);
    router.put("/tasknumber", taskController.addActionNameAndNumber);
    router.put("/task", taskController.updateAction);

    router.get('/folders', function (req, res, next) {
        var schema = mongoose.Schema({
            _id: mongoose.Types.ObjectId,
            title: String,
            key: String,
            isRoot: Boolean,
            isLeaf: Boolean,
            parentId: mongoose.Types.ObjectId
        });
        var Folders;
        // try {
        //     Folders = mongoose.model.Folders;
        // } catch (error) {
        //     Folders = mongoose.model("Folders", schema, "folders");
        // }
        if (!mongoose.models["folders"]) {
            Folders = mongoose.model("folders", schema);
        } else {
            Folders = mongoose.models["folders"];
        }

        Folders.find({}).then(function (folders) {
            res.json(folders);
        });
    });

    router.get('/folders/:folderId', function (req, res, next) {
        var schema = mongoose.Schema({
            _id: mongoose.Types.ObjectId,
            title: String,
            key: String,
            isRoot: Boolean,
            isLeaf: Boolean,
            parentId: mongoose.Types.ObjectId
        });
        var Folders;
        // try {
        //     Folders = mongoose.model.Folders;
        // } catch (error) {
        //     Folders = mongoose.model("Folders", schema, "folders");
        // }
        if (!mongoose.models["folders"]) {
            Folders = mongoose.model("folders", schema);
        } else {
            Folders = mongoose.models["folders"];
        }
        Folders.find({ parentId: mongoose.Types.ObjectId(req.params.folderId) }).then(function (folders) {
            res.json(folders);
        });
    });

    return router;
};
