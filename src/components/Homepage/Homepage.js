import React, { Component } from "react";
import "./Homepage.css";
import { Container } from "react-bootstrap";
import Notepad from "../../assets/notepad.svg";
import FirstForm from "../FirstForm/FirstForm";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderSelected: {},
      handleSelectFolder: this.handleSelectFolder,
      noteSelected: {},
      handleSelectNote: this.handleSelectNote,
    };
  }

  handleSelectFolder = (folderSelected) => {
    this.setState({ folderSelected });
  };

  handleSelectNote = (noteSelected) => {
    this.setState({ noteSelected });
  };

  render() {
    return (
      <div className="App">
        <Container fluid>
          <FirstForm />
        </Container>
      </div>
    );
  }
}

export default Homepage;
