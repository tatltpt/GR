import http from "../http-common";

class GroupDataService {
  getAll() {
    return http.get(`/groups`);
  }

  create(name, number) {
    return http.post(`/groups`, { name, number });
  }
}
export default new GroupDataService();
