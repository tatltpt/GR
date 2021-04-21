import React, { Component } from "react";
import "./Folder.css";
import CreateButton from "../Shared/createButton/createButton";
import DeleteButton from "../Shared/deleteButton/deleteButton";
import FolderItem from "./FolderItem/FolderItem";
import FolderDataService from "../../services/folder.service";
import NoteDataService from "../../services/note.service";
import AppContext from "../../AppContext";
import { Button } from "react-bootstrap";
import firebase from "firebase";
export default class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      foldersChecked: [],
      isEdit: false,
    };
  }
  static contextType = AppContext;

  componentDidMount() {
    this.reloadFolderList();
  }

  // Fetch data from server and set newState
  reloadFolderList = async () => {
    try {
      var users = await firebase.auth().currentUser;
      var user = await users.email;
      const res = await FolderDataService.getFolderByUser(user);
      const { folders } = res.data;
      this.setState({ folders });
      //check folder selected current, if it isn't exist, select folder[0]
      const isSelected = folders
        .map((folder) => folder._id)
        .includes(this.context.folderSelected._id);
      // if folders are empty, set selectFolder to default {}
      !isSelected && this.context.handleSelectFolder(folders[0] || {});
      // console.log(folders);
    } catch (error) {
      console.log(error);
    }
  };


  // Create new folder
  handleNewFolder = () => {
    const name = prompt("Please enter folder name?");
    var users = firebase.auth().currentUser;
    var user = users.email;
    if (name == null) return;

    FolderDataService.create(name, user).then(
      (res) => this.reloadFolderList(),
      (err) => console.log(err)
    );
  };

  // Delete,rename folder
  handleClickEdit = () => {
    this.setState((prevstate) => ({
      isEdit: !prevstate.isEdit,
      foldersChecked: [],
    }));
  };

  handleCheckbox = (folder, e) => {
    const isChecked = e.target.checked;
    isChecked
      ? this.setState((prevState) => ({
          foldersChecked: prevState.foldersChecked.concat(folder),
        }))
      : this.setState((prevState) => ({
          foldersChecked: prevState.foldersChecked.filter(
            (item) => item !== folder
          ),
        }));
  };

  handleRename = (folder) => {
    const name = window.prompt("Please enter new name", folder.name);
    if (name == null) return;
    FolderDataService.update(folder._id, { name }).then(
      (res) => this.reloadFolderList(),
      (err) => console.log(err)
    );
  };

  deleteFolderSelected = async () => {
    const isDelete = window.confirm("Comfirm delete folders ?");
    if (!isDelete) return;

    const isDeleteAll = this.state.foldersChecked.length === 0;
    const listDelete = this.state[isDeleteAll ? "folders" : "foldersChecked"];

    await Promise.all(
      listDelete.map(({ _id }) => FolderDataService.delete(_id))
    );
    this.reloadFolderList();
    this.setState({ foldersChecked: [] });
  };
  dropNote =async (e) => {
    e.preventDefault();
    const note_id = e.dataTransfer.getData('note_id');
    console.log(note_id);
    const folderID = e.target.id;
    console.log(folderID);
      if(folderID) {
      await NoteDataService.moveNote(note_id, {folderID});
    }

  }
  dragOver = (e) => {
    e.preventDefault();
  }
  // Render
  render() {
    const isEdit = this.state.isEdit;
    const isEmpty = this.state.folders.length === 0;
    const foldersCheckedLength = this.state.foldersChecked.length;
    // if no check , show delete all button
    const buttonBotton =
      !isEmpty && isEdit ? (
        <DeleteButton
          nameButton={foldersCheckedLength === 0 ? "Delete all" : "Delete"}
          onDelete={this.deleteFolderSelected}
        />
      ) : (
        <CreateButton
          handleClick={this.handleNewFolder}
          nameButton="New Folder"
        />
      );

    return (
      <div>
        <div className="folderHeader">
          <div className="textHeader">
            {foldersCheckedLength === 0
              ? "Folder"
              : foldersCheckedLength + " Selected"}
          </div>
          <Button
            onClick={this.handleClickEdit}
            className="editButton"
            variant="light"
            size="sm"
          >
            {!isEmpty && isEdit ? "Done" : "Edit"}
          </Button>
        </div>

        <div className="folderContent">
          {this.state.folders.map((folder) => (
            <FolderItem
              key={folder._id}
              id={folder._id}
              isActive={this.context.folderSelected._id === folder._id}
              folder={folder}
              isEdit={isEdit}
              handleCheckbox={this.handleCheckbox}
              handleRename={this.handleRename}
              dropNote={this.dropNote}
              dragOver={this.dragOver}
            />
          ))}
        </div>
        {buttonBotton}
      </div>
    );
  }
}
