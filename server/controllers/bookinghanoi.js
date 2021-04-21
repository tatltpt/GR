"use strict";
exports.name = "controllers.bookinghanoi";

exports.requires = ["@lodash", "@util", "models.bookinghanoi"];

exports.factory = function (_, util, Bookinghanoi) {
  const getAll = (req, res, next) => {
    Bookinghanoi.find({}, function (
        err,
        bookinghanoi
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ bookinghanoi });
    });
  };


  return {
    getAll,
  };

};
