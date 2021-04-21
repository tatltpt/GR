import React from 'react';
import "./NoteItem.css";
import { Col, Modal, Button, Form, Row } from "react-bootstrap";
import AppContext from "../../../AppContext";

class noteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      folders: [],
      isLocked: false,
      show: false,
      showPassword: false,
    }
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }
  static contextType = AppContext;

  milisecondToDate = (mili) => {
    const date = new Date(+mili);
    return date.toLocaleDateString();
  };

  showSubTable = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  
  removeHTMLTags = (str) => {
    str = str.toString();
    // console.log(str);
    str = str.replace(/<[^>]*>/g, '');
    str = str.split('&rsquo;').join("'");
    str = str.split('&mdash;').join("—");
    str = str.split('&Agrave;').join("À");
    str = str.split('&Aacute;').join("Á");
    str = str.split('&Acirc;').join("Â");
    str = str.split('&Atilde;').join("Ã");
    str = str.split('&agrave;').join("à");
    str = str.split('&aacute;').join("á");
    str = str.split('&acirc;').join("â");
    str = str.split('&atilde;').join("ã");
    str = str.split('&Egrave;').join("È");
    str = str.split('&Eacute;').join("É");
    str = str.split('&Ecirc;').join("Ê");
    str = str.split('&egrave;').join("è");
    str = str.split('&eacute;').join("é");
    str = str.split('&ecirc;').join("ê");
    str = str.split('&#131;').join("ƒ");
    str = str.split('&Igrave;').join("Ì");
    str = str.split('&Iacute;').join("Í");
    str = str.split('&igrave;').join("ì");
    str = str.split('&iacute;').join("í");
    str = str.split('&Ograve;').join("Ò");
    str = str.split('&Oacute;').join("Ó");
    str = str.split('&Ocirc;').join("Ô");
    str = str.split('&ograve;').join("ò");
    str = str.split('&oacute;').join("ó");
    str = str.split('&ocirc;').join("ô");
    str = str.split('&otilde;').join("õ");
    str = str.split('&Ugrave;').join("Ù");
    str = str.split('&Uacute;').join("Ú");
    str = str.split('&ugrave;').join("ù");
    str = str.split('&uacute;').join("ú");
    str = str.split('&Yacute;').join("Ý");
    str = str.split('&yacute;').join("ý");
    str = str.split('&lt;').join("<");
    str = str.split('&gt;').join(">");

    // console.log(temp);
    // return temp.trim().replace(/<[^>]*>?/gm, '');
    return str.split('&nbsp;').join("");
  };

  handleModal() {
    this.setState({ show: !this.state.show })
  }

  handleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <div
        onClick={!this.props.isEdit ? this.props.handleSelect.bind(this, this.props.note) : null}
        className={this.props.isActive ? "noteItem actived" : "noteItem"}
        onKeyDown={this.props.handleDeleteNoteSelected}
        draggable={true}
        onDragStart={this.props.dragStart}
        onDragEnd={this.props.dragOver}
        id={this.props.note._id}
      >
        {this.props.isEdit && (
          <input
            onClick={this.props.handleCheckbox.bind(this, this.props.note)}
            type="checkbox"
          />
        )}
        <Col className={"note"}>
          <div className={"info-note"}>
            <div className={this.props.note.pinToTop ? 'pinToTop' : "not-pin"}>Đã ghim</div>
            <div className="noteName">{this.props.note.isLocked ? 'This note has been locked!' : this.removeHTMLTags(this.props.note.content)}</div>
            <div className="createdAt">
              {this.props.note.version ? "Version: " + this.props.note.version : null}
            </div>
          </div>
          <div className={"action"}>
            {/*<p onClick={props.handlepinToTop} id={props.note._id}>i</p>*/}
            <p className={'more-action'} onClick={() => {
              this.showSubTable();
              this.props.reloadFolderList();
            }}>i</p>
            <div className={this.state.isOpen ? 'sub-table open' : 'sub-table'}>
              <div>
                <p onClick={() => this.handleModal()} id={this.props.note._id}>{this.props.note.isLocked ? 'Unlock' : 'Lock'}</p>
                <Modal id="modal" show={this.state.show} onHide={() => this.handleModal()}>
                  <Modal.Header id="modal_header" closeButton>
                    <Modal.Title>{this.props.note.isLocked ? 'ENTER PASSWORD TO UNLOCK' : 'CREATE NEW PASSWORD'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="modal_body">
                    <Form>
                      <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                          Password
                        </Form.Label>
                        <Col sm="10">
                          {this.state.showPassword ?
                            <Form.Control type="text" id="user_input" placeholder="Password" />
                            :
                            <Form.Control type="password" id="user_input" placeholder="Password" />
                          }
                        </Col>
                      </Form.Group>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Show password" onChange={this.handleShowPassword} />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer id="modal_footer">
                    <Button type="submit" id={this.props.note._id} onClick={this.props.handleplockNote}>
                      {this.props.note.isLocked ? 'Unlock' : 'Lock'}
                    </Button>
                    <Button variant="danger" onClick={() => this.handleModal()}>
                      Close
                            </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <p className={"pin-to-top"} onClick={(e) => {
                this.props.handlepinToTop(e);
                this.showSubTable();
              }} id={this.props.note._id}>{this.props.note.pinToTop ? 'Un pin from top' : 'Pin to top'}</p>
              <div className={'move-to-folders'} >
                <p>Move to another Folders</p>
                <ul className={'list-folders'}>
                  {this.props.list_folders.map((value, index) => (
                    <li key={index} id={value._id} onClick={(e) => {
                      this.props.moveNoteToAnotherFolder(e);
                      this.showSubTable();
                    }}>{value.name} </li>
                  ))}
                </ul>
              </div>
              {
                this.props.note.detail ?
                  <div className={"rollback"}>
                    <p>Rollback to version</p>
                    <ul className={'list-version'}>
                      {this.props.note.detail && this.props.note.detail.map((value, index) => (
                        <li key={index} id={value.version} onClick={(e) => {
                          this.props.rollbackToAnotherVersion(e);
                          this.showSubTable();
                        }
                        }> {value.version} </li>
                      ))}
                    </ul>
                  </div> : null
              }
              {/*<p>Delete</p>*/}
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default noteItem;
