import http from "../http-common";

class TaskDataService {

  // newTask
  create(time, name, action, number) {
    return http.post(`/tasks`, { time, name, action, number });
  }

  // getAll
  getAll() {
    return http.get(`/task`);
  }

  // getAllTask
  getAllTask() {
    return http.get(`/tasks`);
  }

  // addActionName
  // updateTask(time, name, action) {
  //   return http.put(`/tasks`, { time, name, action });
  // }

  // addActionNameAndNumber
  updateTaskAndNumber(time, name, action, number, numberLevel) {
    return http.put(`/tasknumber`, { time, name, action, number, numberLevel });
  }

  // updateAction
  updateAction(time, name, action, number, numberLevel) {
    return http.put(`/task`, { time, name, action, number, numberLevel });
  }
}
export default new TaskDataService();
