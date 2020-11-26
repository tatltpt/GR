import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import "./Modal.css";
import ProgressBar from 'react-bootstrap/ProgressBar'

class RunningModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,
        };
    }

    render() {
        const { showModal } = this.props;
        return (
            <div className="modal">
                <Modal show={showModal}>
                    <Modal.Title >Waiting for crawl</Modal.Title>
                    <ProgressBar animated now={100} className="processbar"/>                  
                </Modal>
            </div>
        );
    }
}

export default RunningModal;