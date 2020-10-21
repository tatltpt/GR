import React, { Component } from "react";
import "./SendNote.css";
import { ClockHistory } from 'react-bootstrap-icons';
import {Modal , Button , Form } from "react-bootstrap";
import axios from 'axios';
import FolderShareService from "../../services/share.service";
import Table from 'react-bootstrap/Table';
import firebase from 'firebase';
require('firebase/auth');

const url_shares = "http://localhost:5000/api/shares/";

class ShareHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            shares: [],
        };      
    }

    handleModal()
    {
        this.setState({show:!this.state.show})
    }

    componentDidMount() {
        const users = firebase.auth().currentUser;
        const user = users.email;
        axios.get(url_shares + user)
            .then(res => {
                const shares = res.data.shares;
                this.setState({shares})
            })
            .catch(error => console.log(error));
    }

    deleteShare(id)
    {
        const isDelete = window.confirm("Comfirm delete history ?");
        if (!isDelete) return;
        FolderShareService.delete(id).then(
          (res) => this.componentDidMount(),
          (err) => console.log(err)
        );
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
        const milisecondToDate = (mili) => {
            const date = new Date(+mili);
            return date.toLocaleDateString();
        };
        return (
            <div>
                <Button onClick={() => this.handleModal()}>
                    <ClockHistory /> History
                </Button>
                <Modal id="modal" class="modal" size="lg" show={this.state.show} onHide={() => this.handleModal()}>
                    <Form id="history-form">
                        <Modal.Header id="modal_header" closeButton>
                            <Modal.Title>SEND NOTE HISTORY</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal_body1">
                            <Table>
                              <thead>
                                <tr>
                                    <th>To</th>
                                    <th>Note</th>
                                    <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                    {this.state.shares.map((share) => (
                                    <tr>
                                        <td>{share.to}</td>
                                        <td>{this.removeHTMLTags(share.note_content)}</td>
                                        <td>{milisecondToDate(share.createdAt)}</td>
                                        <td><Button variant="secondary" size="sm" 
                                            onClick={(e) => this.deleteShare(share._id, e)}>Delete</Button></td>
                                    </tr>  
                                    ))}
                              </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer id="modal_footer">
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
export default ShareHistory;