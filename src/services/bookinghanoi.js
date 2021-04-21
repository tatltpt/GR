import http from "../http-common";

class BookingDataService {
  getAll() {
    return http.get(`/hotels`);
  }

}
export default new BookingDataService();
