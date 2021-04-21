import React, { Component } from "react";
import "./Note.css";
import CreateButton from "../Shared/createButton/createButton";
import DeleteButton from "../Shared/deleteButton/deleteButton";
import NoteItem from "./NoteItem/NoteItem";
import NoteDataService from "../../services/note.service";
import AppContext from "../../AppContext";
import { Row, Col, Button } from "react-bootstrap";
import Content from "./Content/Content";
import FolderDataService from "../../services/folder.service";
import firebase from "firebase";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      notesChecked: [],
      isEdit: false,
      isNewNote: false,
      pinToTop: false,
      isLocked: false,
      version: null,
      content: '',
      folders: []
    };
  }

  static contextType = AppContext;

  async componentDidMount() {
    document.addEventListener("keydown", this.handleDeleteNoteSelected, false);
    var users = await firebase.auth().currentUser;
    var user = await users.email;
    const res = await FolderDataService.getFolderByUser(user);
    // const res = await FolderDataService.getAll();
    const folders = res.data.folders;
    this.setState({
      folders: folders
    })
  }

  componentDidUpdate(prevProps) {
    const { folderID } = this.props;
    if (prevProps.folderID !== folderID && folderID) {
      this.reloadNoteList();
    }
    // case: empty folder list
    if (prevProps.folderID !== folderID && !folderID && prevProps.folderID) {
      this.setState({ notes: [] });
      this.props.handleSelect({});
    }
  }

  // select noteItem
  handleSelect = (note) => {
    this.props.handleSelect(note);
    this.setState({ isNewNote: false });
  };
  // Fetch data from server and set newState
  reloadNoteList = async () => {
    try {
      const res = await NoteDataService.getAll(this.props.folderID);
      const { notes } = res.data;
      this.setState({ notes });
      //check note selected current, if it isn't exist, select notes[0]
      const isSelected = notes
        .map((note) => note._id)
        .includes(this.context.noteSelected._id);
      // if folders are empty, set selectFolder to default {}

      !isSelected && this.props.handleSelect(notes[0] || {});
    } catch (error) {
      console.log(error);
    }
  };
  reloadFolderList = async () => {
    try {
      var users = await firebase.auth().currentUser;
      var user = await users.email;
      const res = await FolderDataService.getFolderByUser(user);
      const { folders } = res.data;
      this.setState({ folders });
    } catch (error) {
      console.log(error);
    }
  };
  //Create new note
  handleClickNewNote = () => {
    this.setState({ isNewNote: true });
  };

  extendContent = async (check) => {
    if (check === 1) {
      document.getElementById("note-box").style.display = "none"
      document.getElementById("content-box").setAttribute("class", "col-100vh col-md-12")
    } else {
      document.getElementById("note-box").style.display = "block"
      document.getElementById("content-box").setAttribute("class", "col-100vh col-md-8")
    }
    try {
      this.props.handleExtendEvent(check);
    } catch (error) {
      console.log(error);
    }
  };

  handleCreateNewNote = async (content, version) => {
    const res = await NoteDataService.create(this.props.folderID, content, version);
    this.handleSelect(res.data.note);
  };

  // Delete,rename note
  handleClickEdit = () => {
    this.setState((prevstate) => ({
      isEdit: !prevstate.isEdit,
      notesChecked: [],
    }));
  };

  handleCheckbox = (note, e) => {
    const isChecked = e.target.checked;
    isChecked
      ? this.setState((prevState) => ({
        notesChecked: prevState.notesChecked.concat(note),
      }))
      : this.setState((prevState) => ({
        notesChecked: prevState.notesChecked.filter((item) => item !== note),
      }));
  };

  deleteNotesSelected = async () => {
    const isDelete = window.confirm("Comfirm delete folders ?");
    if (!isDelete) return;

    const isDeleteAll = this.state.notesChecked.length === 0;
    const listDelete = this.state[isDeleteAll ? "notes" : "notesChecked"];

    await Promise.all(listDelete.map(({ _id }) => NoteDataService.delete(_id)));

    this.reloadNoteList();
    this.setState({ notesChecked: [] });
  };
  handleDeleteNoteSelected = async (e) => {
    if (e.keyCode === 46) {
      const isDelete = window.confirm("Do you want to delete this note ?");
      if (!isDelete) return;
      await NoteDataService.delete(this.context.noteSelected._id);
      this.reloadNoteList();
    }
  }

  handleplockNote = async (e) => {
    const selectedNote = e.target.id;
    const listNotes = this.state.notes;
    listNotes.map(async (note) => {
      if (note._id === selectedNote) {
        let isLocked = note.isLocked;
        const user_input = document.getElementById('user_input').value;
        if (isLocked) {
          if (user_input === note.password) {
            alert(" Welcome back!");
            isLocked = !note.isLocked;
            this.setState({ isLocked: isLocked });
            await NoteDataService.update(selectedNote, { isLocked })
            this.reloadNoteList();
          }
          else {
            alert("Wrong password. Please try again!");
          }
        }
        else {
          const user_input = document.getElementById('user_input').value;
          if (user_input === "") {
            alert("Please input new password");
          }
          else {
            await NoteDataService.update(selectedNote, { password: user_input });
            alert("Your note is locked");
            isLocked = !note.isLocked;
            this.setState({ isLocked: isLocked });
            await NoteDataService.update(selectedNote, { isLocked })
            this.reloadNoteList();
          }
        }
      }
    })
  }

  handlePinToTop = async (e) => {
    const selectedNote = e.target.id;
    const listNotes = this.state.notes;
    listNotes.map(async (note) => {
      if (note._id === selectedNote) {
        let pinToTop = !note.pinToTop;
        await NoteDataService.pinNoteToTop(selectedNote, { pinToTop })
        this.reloadNoteList();
      }
    })
  }

  moveNoteToAnotherFolder = async (e) => {
    const selectedNoteID = this.context.noteSelected._id;
    const folderID = e.target.id;
    await NoteDataService.moveNote(selectedNoteID, { folderID });
    this.reloadNoteList();
  }

  rollbackToAnotherVersion = async (e) => {
    const version = e.target.id;
    const detail = this.context.noteSelected.detail;
    for (let i = 0; i < detail.length; i++) {
      if (detail[i].version === version) {
        const content = detail[i].content;
        await NoteDataService.update(this.context.noteSelected._id, { content, version });
      }
    }
    this.reloadNoteList();
  }

  dragStart = (e) => {
    const note_id = e.target.id;
    e.dataTransfer.setData('note_id', note_id);
  }
  dragOver = (e) => {
    e.stopPropagation();
    this.reloadNoteList();
  }
  render() {
    const isEdit = this.state.isEdit;
    const list_folders = this.state.folders.filter(folder => folder._id !== this.context.folderSelected._id)
    const notesCheckedLength = this.state.notesChecked.length;
    const buttonEdit = (
      <Button
        variant="light"
        size="sm"
        className="editButton"
        onClick={this.handleClickEdit}
      >
        {isEdit ? "Done" : "Edit"}
      </Button>
    );
    const buttonBotton = isEdit ? (
      <DeleteButton
        nameButton={notesCheckedLength === 0 ? "Delete all" : "Delete"}
        onDelete={this.deleteNotesSelected}
      />
    ) : (
        <CreateButton
          handleClick={this.handleClickNewNote}
          nameButton="New Note"
        />
      );

    return (
      <Row>
        <Col id="note-box" md={4} className="col-100vh">
          <div>
            <div className="noteHeader">
              <div className="textHeader">
                {notesCheckedLength === 0
                  ? "Notes"
                  : notesCheckedLength + " Selected"}
              </div>
              {buttonEdit}
            </div>

            <div className="noteContent">
              {this.state.notes.map((note) => (
                <NoteItem
                  key={note._id}
                  id={note._id}
                  note={note}
                  folderID={this.props.folderID}
                  isActive={this.context.noteSelected._id === note._id}
                  isEdit={isEdit}
                  handleCheckbox={this.handleCheckbox}
                  handleSelect={this.handleSelect}
                  handleDeleteNoteSelected={id => this.handleDeleteNoteSelected(id)}
                  handleplockNote={e => this.handleplockNote(e)}
                  handlepinToTop={e => this.handlePinToTop(e)}
                  moveNoteToAnotherFolder={e => this.moveNoteToAnotherFolder(e)}
                  rollbackToAnotherVersion={e => this.rollbackToAnotherVersion(e)}
                  list_folders={list_folders}
                  dragStart={e => this.dragStart(e)}
                  dragOver={e => this.dragOver(e)}
                  reloadFolderList={this.reloadFolderList}
                />
              ))}
            </div>
            {buttonBotton}
          </div>
        </Col>
        <Col id="content-box" md={8} className="border-left col-100vh">
          <Content
            extendContent={this.extendContent}
            handleCreateNewNote={this.handleCreateNewNote}
            isNewNote={this.state.isNewNote}
            isLocked={this.state.isLocked}
            reloadNoteList={this.reloadNoteList}
          />
          <CopyRight />
        </Col>
      </Row>
    );
  }
}

const CopyRight = () => {
  return (
    <div className="App-link">
      <span>Copyright &copy; 2020 </span>
      <a
        href="https://rikkeisoft.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rikkeisoft
      </a>
    </div>
  );
};
