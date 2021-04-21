import http from "../http-common";

class FolderDataService {
  update(id, data) {
    return http.put(`/folders/${id}`, data);
  }

  getAll() {
    return http.get(`/folders`);
  }

  getFolderById(folderID) {
    return http.get(`/folders/${folderID}`);
  }

  getFolderByUser(user) {
    return http.get(`/folder/${user}`);
  }

  delete(folderID) {
    return http.delete(`/folders/${folderID}`);
  }

  create(name, user) {
    return http.post(`/folders`, { name, user });
  }
}
export default new FolderDataService();
