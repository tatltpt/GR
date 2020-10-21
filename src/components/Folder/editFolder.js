import React, { Component } from 'react';
import "./editFolder.css";
import { ThreeDots } from 'react-bootstrap-icons';

class EditFolder extends Component {
    render() {
        return (
            <div className="editFolder">
                <span>New Folder</span>
                <ThreeDots />
            </div>
        );
    }
}

export default EditFolder;