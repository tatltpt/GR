"use strict";
exports.name = "controllers.task";

exports.requires = ["@lodash", "@util", "models.task"];

exports.factory = function (_, util, Task) {

  const newTask = (req, res, next) => {
    const {time, name, action, number} = _.get(req, "body", "");
    const task = new Task();
    task.actionName.push({name: name, actions: [], number: number});
    task.actionName[number].actions.push({action: action});
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
    // const {time, name, action} = _.get(req, "body", "");
    // Task.update({time: time}, {$push: {actionName: { $each: [{name: name, action: action}]}}})
    //   .then((data) => {
    //     if (!data) {
    //       res.status(404).send({
    //         errors: [err.message],
    //       });
    //     } else res.send({ message: "Successfully." });
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message: "Error",
    //     });
    //   });
  }

  const addActionNameAndNumber = (req, res, next) => {
    const {time, name, action, number} = _.get(req, "body", "");
    const actions = [];
    actions.push({action: action});
    Task.update({time: time}, {$push: {actionName: { $each: [{name: name, actions: actions, number: number}]}}})
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
    const actionNameNumber = `actionName.${number}.actions`;

    const data = {};
    data[actionNameNumber] = {action: action};

    // tasks.update({time: "0h"}, {$set: {"actionName.0": {name: "Te", action: "test", number: "0"}}})
    // tasks.update({time: "0h"}, {$push: {"actionName.1.actions": {action: "test"}}})
    console.log(data);
    Task.update({time: time}, {$push: data})
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

  const run = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
          const { stdout, stderr } = await exec('command.bat');
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);
      }catch (err) {
         console.error(err);
      };
    };
    lsWithGrep();
  }

  return {
    newTask,
    getAll,
    getAllTask,
    addActionName,
    updateAction,
    addActionNameAndNumber,
    run,
  };

};
