import React from 'react';
import {Modal , Button , Form , FormGroup , FormControl ,FormLabel , Col} from "react-bootstrap";
import { Download } from 'react-bootstrap-icons';
import jsPDF from "jspdf";
import "./SendNote.css";
import axios from 'axios';
import firebase from 'firebase';
require('firebase/auth');

const url_folders = "http://localhost:5000/api/folder/";
const url_notes = "http://localhost:5000/api/notes/";

class PDF extends React.Component {
  constructor(props){
    super(props);
    this.pdfToHTML=this.pdfToHTML.bind(this);
    this.state = {
        show: false,
        folders: [],
        notes: [],
        folder_id:'',
        content: '',
    };
    this.handleFolderChange = this.handleFolderChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleNoteChange(event) {
        this.setState({content: event.target.value});
  }  

  componentDidMount() {
        const users = firebase.auth().currentUser;
        const user = users.email;
        axios.get(url_folders + user)
            .then(res => {
                const folders = res.data.folders;
                this.setState({folders})

            })
            .catch(error => console.log(error));
    }

  handleFolderChange(event) {
      this.setState({folder_id: event.target.value});
      axios.get(url_notes + event.target.value)
          .then(res => {
                const notes = res.data.notes;
                this.setState({notes})
            })
          .catch(error => console.log(error));
  }

  xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  pdfToHTML(){
    var doc = new jsPDF('p', 'pt');
    const author = this.xoa_dau(document.getElementById('name').value);
    const note = this.xoa_dau(this.removeHTMLTags(document.getElementById('note').value));
    var splitTitle = doc.splitTextToSize(note, 470);

    doc.setTextColor('pink')
    doc.text(20, 50, 'Author:')

    doc.setTextColor('black')
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text(40, 90, author)

    doc.setTextColor('pink')
    doc.setFontType('normal')
    doc.text(20, 130, 'Note:')

    doc.setTextColor('black')
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text(40, 170, splitTitle)      

      
    doc.save('iNote.pdf')
  }

  handleSubmit(e){
    e.preventDefault();
    const note = document.getElementById('note').value;
    if ( note === "" ){
        alert("Please choose note")
    }
    else {
        this.pdfToHTML();
    }
  }

  handleModal(){
    this.setState({show:!this.state.show})
  }

  removeHTMLTags = (str) => {
    str = str.toString();
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
    return str.split('&nbsp;').join("");
  };


  render() {
    const maxLength=55;
    const users = firebase.auth().currentUser;
    const name = users.displayName;
    return (    
    <div>
            <Button onClick={() => this.handleModal()}><Download /> PDF</Button>
            <Modal id="modal" class="modal" show={this.state.show} onHide={() => this.handleModal()}>
              <div>
                <Form id="sendNote-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                  <Modal.Header id="modal_header" closeButton>
                    <Modal.Title>EXPORT NOTE TO PDF</Modal.Title>
                  </Modal.Header>

                  <Modal.Body id="modal_body">
                    <FormGroup as={Col } md={12} hidden>
                      <FormLabel>Your name:</FormLabel>
                      <FormControl type="text" id="name" value={name} readOnly/>
                    </FormGroup>
                    <FormGroup as={Col} md={12}>
                      <FormLabel>Choose a Folder:</FormLabel>
                      <FormControl as="select" id="folder" onChange={this.handleFolderChange}>
                        <option value="" disabled selected>Select folder</option>
                          {this.state.folders.map(folder => <option value={(folder._id)} >{(folder.name)}</option>)}
                      </FormControl>
                    </FormGroup>
                    <FormGroup as={Col} md={12}>
                      <FormLabel>Choose a Note:</FormLabel>
                        <FormControl as="select" id="note" onChange={this.handleNoteChange}>
                          <option value="" disabled selected>Select note</option>
                            { this.state.notes.map(note =>{
                              if (this.removeHTMLTags(note.content).length > maxLength){return <option id="content" value={note.content}>{this.removeHTMLTags(note.content).slice(0, maxLength - 1) + "..."}</option>; }
                              else {return <option id="content" value={note.content}>{this.removeHTMLTags(note.content)}</option>;}
                            })}
                        </FormControl>
                    </FormGroup>              
                  </Modal.Body>

                  <Modal.Footer id="modal_footer">
                      <Button type="submit" >Download PDF</Button>
                  </Modal.Footer>
                </Form>     
              </div>
            </Modal>
        </div>
    );
  } 
}

export default PDF;