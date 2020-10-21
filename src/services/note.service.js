import http from "../http-common";

class NoteDataService {
  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  pinNoteToTop(noteId, data){
    return http.put(`/notes/${noteId}`, data);
  }

  moveNote(noteID, data){
    return http.post(`/notes/${noteID}`, data);
  }

  getAll(folderId) {
    return http.get(`/notes/${folderId}`);
  }

  getNoteById(noteID) {
    return http.get(`/note/${noteID}`);
  }

  delete(noteID) {
    return http.delete(`/notes/${noteID}`);
  }

  create(folderID, content, version) {
    return http.post(`/notes`, { content, folderID, version });
  }

}
export default new NoteDataService();
