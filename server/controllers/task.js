"use strict";

exports.name = "controllers.task";

exports.requires = ["@lodash", "models.task"];

exports.factory = function (_, Task) {

  const newTask = (req, res, next) => {
    const {time, name, action, number} = _.get(req, "body", "");
    const task = new Task();
    task.actionName.push({name: name, action: action, number: number});
    new Task({
      time: time,
      actionName: task.actionName,
    }).save(function (err, task) {
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ task });
    });
  };

  const getAll = (req, res, next) => {
    Task.find({}, function (
        err,
        tasks
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ tasks });
    });
  };

  const getAllTask = (req, res, next) => {
    Task.find({}, function (
        err,
        tasks
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ tasks });
    }).sort({time: -1});
  };

  const addActionName = (req, res, next) => {
    const {time, name, action} = _.get(req, "body", "");
    Task.update({time: time}, {$push: {actionName: { $each: [{name: name, action: action}]}}})
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

  const addActionNameAndNumber = (req, res, next) => {
    const {time, name, action, number} = _.get(req, "body", "");
    Task.update({time: time}, {$push: {actionName: { $each: [{name: name, action: action, number: number}]}}})
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

  const updateAction = (req, res, next) => {
    const {time, name, action, number, numberLevel} = _.get(req, "body", "");
    const actionNameNumber = `actionName.${number}`;

    const data = {};
    data[actionNameNumber] = {name: name, action: action, number: numberLevel};

    Task.update({time: time}, {$set: data})
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
    newTask,
    getAll,
    getAllTask,
    addActionName,
    updateAction,
    addActionNameAndNumber,
  };

};
