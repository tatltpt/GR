"use strict";

exports.name = "controllers.share";

exports.requires = ["@lodash", "models.share"];

exports.factory = function (_, Share) {
    const getAllShares = (req, res, next) => {
        Share.find({}, null, { sort: { createdAt: -1 } }, function (
            err,
            shares
        ) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ shares });
        });
    };

    const getShareByUser = (req, res, next) => {
        const user = req.params.user;
        Share.find({from: user}, function (err, shares) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ shares });
        });
    };

    const getShareById = (req, res, next) => {
        const _id = req.params.shareId;
        Share.findOne({ _id }, function (err, share) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ share });
        });
    };

    const newShare = (req, res, next) => {
        var user = _.get(req, "body.user", "").trim();
        var email = _.get(req, "body.email", "").trim();
        var note_id = _.get(req, "body.note_id", "").trim();
        var note_content = _.get(req, "body.note_content", "").trim();
        if (!user) {
            res.status(500).send({
                errors: ["user not found."],
            });
        }

        new Share({
            from: user,
            to: email,
            note_id: note_id,
            note_content: note_content,
        }).save(function (err, share) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ share });
        });
    };

    const deleteShare = (req, res, next) => {
        const id = req.params.shareId;
        Share.findByIdAndRemove(id)
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



    return {
        getAllShares,
        getShareById,
        newShare,
        getShareByUser,
        deleteShare,
    };
};
