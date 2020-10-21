import React, { Component } from "react";
import './verifyPage.css';
import SignIn from "../../SignIn/SignIn";
import { UserContext } from "../../../providers/UserProvider";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import Notepad from "../../../assets/notepad.svg";
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
//require('firebase/auth');

const url_share = "http://localhost:5000/api/share/";
const url_homepage = "http://localhost:3000/"

class verifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareID: '',
            verify: false,
            redirect: false,
            show: true,
        };
    }

    handleClick() {
        const users = firebase.auth().currentUser;
        const cur_email = users.email;
        const shareID = this.props.match.params.shareID;
        this.setState({ shareID: shareID });

        axios.get(url_share + shareID)
            .then(res => {
                const receiver_email = res.data.share.to;
                if (cur_email !== receiver_email) {
                    alert("You can't access this shared note!");
                }
                else {
                    alert("Welcome");
                    this.setState({ redirect: true });
                }
            })
            .catch(
                error => {
                    console.log(error);
                    alert("Can't find this shared note!");
                });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/showNote/" + this.state.shareID} />;
        }
        return (
            <div id="root2">
                <UserContext.Consumer>
                    {(user) =>
                        user ? (
                            <div id="root1">
                                <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                                    <tbody><tr>
                                        <td bgcolor="#488AD7" align="center">
                                            <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: '600px' }}>
                                                <tbody><tr>
                                                    <td align="center" valign="top" style={{ padding: '10px 10px 40px 10px' }}> </td>
                                                </tr>
                                                </tbody></table>
                                        </td>
                                    </tr>
                                        <tr>
                                            <td bgcolor="#488AD7" align="center" style={{ padding: '0px 10px 0px 10px' }}>
                                                <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: '600px' }}>
                                                    <tbody><tr>
                                                        <td bgcolor="#ffffff" align="center" valign="top" style={{ padding: '40px 20px 20px 20px', borderRadius: '4px 4px 0px 0px', color: '#111111', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '48px', fontWeight: 400, letterSpacing: '4px', lineHeight: '48px' }}>
                                                            <h1 style={{ fontSize: '48px', fontWeight: 400, margin: 2 }}>Verify your email !</h1> <img alt="Inote Logo" className="App-logo" src={Notepad} width={125} height={125} style={{ display: 'block', border: '0px' }} />
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td bgcolor="#f4f4f4" align="center" style={{ padding: '0px 10px 0px 10px' }}>
                                                <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ maxWidth: '600px' }}>
                                                    <tbody><tr>
                                                        <td bgcolor="#ffffff" align="left" style={{ padding: '20px 30px 40px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px' }}>
                                                            <p style={{ margin: 0 }}>You got a message from iNote App. First, you need to verify your email. Just press the button below.</p>
                                                        </td>
                                                    </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left">
                                                                <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                                                    <tbody><tr>
                                                                        <td bgcolor="#ffffff" align="center" style={{ padding: '20px 30px 60px 30px' }}>
                                                                            <table border={0} cellSpacing={0} cellPadding={0}>
                                                                                <tbody><tr>
                                                                                    <td align="center" style={{ borderRadius: '3px' }} bgcolor="#488AD7"><Button onClick={() => this.handleClick()} target="_blank" style={{ fontSize: '20px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#ffffff', textDecoration: 'none', padding: '15px 25px', borderRadius: '2px', border: '1px solid #488AD7', display: 'inline-block' }}>Verify Email</Button></td>
                                                                                </tr>
                                                                                </tbody></table>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody></table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left" style={{ padding: '0px 30px 0px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px' }}>
                                                                <p style={{ margin: 0 }}>If that doesn't work, please contact us for more information:</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left" style={{ padding: '20px 30px 20px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px' }}>
                                                                <p style={{ margin: 0 }}><a href="https://vn.rikkeisoft.com" style={{ color: '#488AD7' }}>https://vn.rikkeisoft.com/</a></p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left" style={{ padding: '0px 30px 40px 30px', borderRadius: '0px 0px 4px 4px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px' }}>
                                                                <p style={{ margin: 0 }}>From: <br />TTS Team Rikkeisoft</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="right" style={{ padding: '0px 10px 20px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px' }}>
                                                                <p style={{ margin: 0 }}><a href={url_homepage} style={{ color: '#488AD7' }}>Back to homepage</a></p>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                            </td>
                                        </tr>
                                    </tbody></table>
                            </div>
                        ) : (
                                <SignIn />
                            )
                    }
                </UserContext.Consumer>
            </div >
        );
    };
}
export default verifyPage;
