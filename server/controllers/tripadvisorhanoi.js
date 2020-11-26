"use strict";
exports.name = "controllers.tripadvisorhanoi";

exports.requires = ["@lodash", "@util", "models.tripadvisorhanoi"];

exports.factory = function (_, util, Tripadvisorhanoi) {
  const getAll = (req, res, next) => {
    Tripadvisorhanoi.find({}, function (
        err,
        tripadvisorhanoi
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ tripadvisorhanoi });
    });
  };

  const updateDataHotel = (req, res, next) => {
    const { name, roomtype, comment} = _.get(req, "body", "");
    
    // tasks.update({time: "0h"}, {$set: {"actionName.0": {name: "Te", action: "test", number: "0"}}})
    // tasks.update({time: "0h"}, {$push: {"actionName.1.actions": {action: "test"}}})
    Tripadvisorhanoi.update({name: name}, {$push: {roomtype: roomtype, comment: comment}})
      .then((data) => {
        if (!data) {
          res.status(404).send({
            errors: [err.message],
          });
        } else res.send({ message: "Successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error",
        });
      });
  }


  return {
    getAll,
    updateDataHotel,
  };

};
