import React, { Component } from "react";
import axios from 'axios';
import './ShowNote.css';

const url_share = "http://localhost:5000/api/share/";
const url_note = "http://localhost:5000/api/note/";

class ShowNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            send_email: '',
            note_content: '',
        }
    }

    componentDidMount() {
        const shareID = this.props.match.params.shareID;
        axios.get(url_share + shareID)
            .then(res => {
                this.setState({ send_email: res.data.share.from });
                const noteID = res.data.share.note_id;
                axios.get(url_note + noteID)
                    .then(res => {
                        this.setState({ note_content: res.data.note.content });
                    })
                    .catch(
                        error => {
                            console.log(error);
                        });
            })
            .catch(
                error => {
                    console.log(error);
                });
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
        return (
            <div class="container">
                <div class="body"></div>
                <div class="chat">
                    <div class="profile">
                        <img
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a8ccd69bd6cc884f728949673c6829cf'
                            alt='' />
                    </div>
                    <div class="message">
                        {this.removeHTMLTags(this.state.note_content)}
                    </div>
                    <div class="user">
                        From:{this.state.send_email}
                    </div>
                </div>
            </div>

        );
    };
}

export default ShowNote;

