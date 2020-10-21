import http from "../http-common";

class TaskDataService {

  create(time, name, action, number) {
    return http.post(`/tasks`, { time, name, action, number });
  }

  getAll() {
    return http.get(`/task`);
  }

  getAllTask() {
    return http.get(`/tasks`);
  }

  updateTask(time, name, action) {
    return http.put(`/tasks`, { time, name, action });
  }

  updateTaskAndNumber(time, name, action, number, numberLevel) {
    return http.put(`/tasknumber`, { time, name, action, number, numberLevel });
  }

  updateAction(time, name, action, number, numberLevel) {
    return http.put(`/task`, { time, name, action, number, numberLevel });
  }
}
export default new TaskDataService();
