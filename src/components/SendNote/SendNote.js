import React, { Component } from "react";
import "./SendNote.css";
import { PeopleFill } from 'react-bootstrap-icons';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel, Col } from "react-bootstrap";
import axios from 'axios';
import ShareDataService from "../../services/share.service";
import firebase from 'firebase/app';
import 'firebase/auth';
//require('firebase/auth');


const url_folders = "http://localhost:5000/api/folder/";
const url_notes = "http://localhost:5000/api/notes/";
const url_note = "http://localhost:5000/api/note/";
const url_send_mail = "http://localhost:3002/send";

class SendNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            folders: [],
            notes: [],
            folder_id: '',
            note1: '',
        };
        this.handleFolderChange = this.handleFolderChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    componentDidMount() {
        const users = firebase.auth().currentUser;
        const user = users.email;
        axios.get(url_folders + user)
            .then(res => {
                const folders = res.data.folders;
                this.setState({ folders })
            })
            .catch(error => console.log(error));
    }

    handleFolderChange(event) {
        this.setState({ folder_id: event.target.value });
        axios.get(url_notes + event.target.value)
            .then(res => {
                const notes = res.data.notes;
                this.setState({ notes })

            })
            .catch(error => console.log(error));
    }

    handleNoteChange(event) {
        axios.get(url_note + event.target.value)
            .then(res => {
                const note1 = res.data.note;
                this.setState({ note1 })

            })
            .catch(error => console.log(error));
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const send_email = document.getElementById('send_email').value;
        const receiver_email = document.getElementById('receiver_email').value;
        const folder = document.getElementById('folder').value;
        const note = document.getElementById('note').value;
        if (receiver_email === "") {
            alert("Please input the receiver email address")
        }
        else if (folder === "") {
            alert("Please choose folder")
        }
        else if (note === "") {
            alert("Please choose note")
        }
        else {
            const content = this.state.note1.content;
            ShareDataService.createShare(send_email, receiver_email, note, content).then(res => {
                const share_ID = res.data.share._id;
                axios({
                    method: "POST",
                    url: url_send_mail,
                    data: {
                        name: name,
                        email: receiver_email,
                        message: share_ID,
                    }
                }).then((response) => {
                    if (response.data.msg === 'success') {
                        alert("Message Sent.");
                        this.resetForm();
                    } else if (response.data.msg === 'fail') {
                        alert("Message failed to send.")
                    }
                })
            })
                .catch(error => console.log(error));
        }
    }

    resetForm() {
        document.getElementById('sendNote-form').reset();
    }

    removeHTMLTags = (str) => {
        str = str.toString();
        str = str.replace(/<[^>]*>/g, '');
        str = str.split('&rsquo;').join("'");
        str = str.split('&mdash;').join("???");
        str = str.split('&Agrave;').join("??");
        str = str.split('&Aacute;').join("??");
        str = str.split('&Acirc;').join("??");
        str = str.split('&Atilde;').join("??");
        str = str.split('&agrave;').join("??");
        str = str.split('&aacute;').join("??");
        str = str.split('&acirc;').join("??");
        str = str.split('&atilde;').join("??");
        str = str.split('&Egrave;').join("??");
        str = str.split('&Eacute;').join("??");
        str = str.split('&Ecirc;').join("??");
        str = str.split('&egrave;').join("??");
        str = str.split('&eacute;').join("??");
        str = str.split('&ecirc;').join("??");
        str = str.split('&#131;').join("??");
        str = str.split('&Igrave;').join("??");
        str = str.split('&Iacute;').join("??");
        str = str.split('&igrave;').join("??");
        str = str.split('&iacute;').join("??");
        str = str.split('&Ograve;').join("??");
        str = str.split('&Oacute;').join("??");
        str = str.split('&Ocirc;').join("??");
        str = str.split('&ograve;').join("??");
        str = str.split('&oacute;').join("??");
        str = str.split('&ocirc;').join("??");
        str = str.split('&otilde;').join("??");
        str = str.split('&Ugrave;').join("??");
        str = str.split('&Uacute;').join("??");
        str = str.split('&ugrave;').join("??");
        str = str.split('&uacute;').join("??");
        str = str.split('&Yacute;').join("??");
        str = str.split('&yacute;').join("??");
        str = str.split('&lt;').join("<");
        str = str.split('&gt;').join(">");
        return str.split('&nbsp;').join("");
      };

    render() {
        const maxLength = 38;
        const users = firebase.auth().currentUser;
        const name = users.displayName;
        const email = users.email;
        return (
            <div>
                <Button onClick={() => this.handleModal()}>
                    <PeopleFill />Share Note
                </Button>
                <Modal id="modal" show={this.state.show} onHide={() => this.handleModal()}>
                    <Form id="sendNote-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <Modal.Header id="modal_header" closeButton>
                            <Modal.Title>SEND NOTE TO EMAIL</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal_body">
                            <Form.Row>
                                <FormGroup as={Col} md={5}>
                                    <FormLabel>Your name:</FormLabel>
                                    <FormControl type="text" id="name" value={name} readOnly />
                                </FormGroup>
                                <FormGroup as={Col} md={7}>
                                    <FormLabel >Your email address:</FormLabel>
                                    <FormControl type="email" id="send_email" value={email} readOnly />
                                </FormGroup>
                            </Form.Row>
                            <br />
                            <FormGroup>
                                <FormLabel>To:</FormLabel>
                                <FormControl type="email" id="receiver_email" />
                            </FormGroup>
                            <br />
                            <Form.Row>
                                <FormGroup as={Col} md={4}>
                                    <FormLabel>Choose a Folder:</FormLabel>
                                    <FormControl as="select" id="folder" onChange={this.handleFolderChange}>
                                        <option value="" disabled selected>Select folder</option>
                                        {this.state.folders.map(folder => <option value={(folder._id)} >{(folder.name)}</option>)}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup as={Col} md={8}>
                                    <FormLabel>Choose a Note:</FormLabel>
                                    <FormControl as="select" id="note" onChange={this.handleNoteChange}>
                                        <option value="" disabled selected>Select note</option>
                                        {this.state.notes.map(note => {
                                            if (this.removeHTMLTags(note.content).length > maxLength) { return <option value={note._id}>{this.removeHTMLTags(note.content).slice(0, maxLength - 1) + "..."}</option>; }
                                            else { return <option  value={note._id}>{this.removeHTMLTags(note.content)}</option>; }
                                        })}
                                    </FormControl>
                                </FormGroup>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer id="modal_footer">
                            <Button type="submit">
                                Send
                            </Button>
                            <Button variant="danger" onClick={() => this.handleModal()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default SendNote;
