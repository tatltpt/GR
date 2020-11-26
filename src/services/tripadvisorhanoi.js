import http from "../http-common";

class TripadvisorataService {
  getAll() {
    return http.get(`/tripadvisorhotels`);
  }

  updateDataHotel( name, roomtype, comment ) {
    return http.put(`/updatedatas`, { name, roomtype, comment });
  }

}
export default new TripadvisorataService();
