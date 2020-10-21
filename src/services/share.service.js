import http from "../http-common";

class ShareDataService {
    createShare(user, email, note_id, note_content) {
        return http.post(`/share`, { user, email, note_id, note_content });
    }

    getShareByUser(user) {
    	return http.get(`/shares/${user}`);
  	}

  	delete(shareID) {
    	return http.delete(`/share/${shareID}`);
  	}
}

export default new ShareDataService();
