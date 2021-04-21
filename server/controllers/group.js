"use strict";

exports.name = "controllers.group";

exports.requires = ["@lodash", "models.group"];

exports.factory = function (_, Group) {
    const getAllGroupName = (req, res, next) => {
        Group.find({}, function (
            err,
            groups
        ) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ groups });
        });
    };

    const newGroup = (req, res, next) => {
        const { name, number } = _.get(req, "body", "");
        const group = new Group();
        new Group({
          name: name,
          number: number,
        }).save(function (err, note) {
          if (err) {
            console.error(err);
            res.status(500).send({
              errors: [err.message],
            });
            return;
          }
          res.json({ group });
        });
      };

    return {
        getAllGroupName,
        newGroup,
    };
};
