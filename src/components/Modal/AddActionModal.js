import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "./Modal.css";
import TaskDataService from "../../services/task.service";

class AddActionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,
        };
    }

    handleSubmit = async () => {
        const { name } = this.props;
        const time = document.getElementById('time').value;
        const hourDay = document.getElementById('hourDay').value;
        const beforeAfter = document.getElementById('beforeAfter').value;
        let finalTime = time + hourDay + beforeAfter;
        if (beforeAfter === '前') {
        if (hourDay === '時間') {
        finalTime = 'c' + finalTime;
        } else if (hourDay === '⽇') {
        finalTime = 'd' + finalTime;
        }
        finalTime = 'a' + finalTime;
        } else if (beforeAfter === '後') {
        if (hourDay === '時間') {
        finalTime = 'd' + finalTime;
        } else if (hourDay === '⽇') {
        finalTime = 'c' + finalTime;
        }
        finalTime = '-b' + finalTime;
        }
        if (time === "0") {
        finalTime = "0h";
        }
        const action = document.getElementById('action').value;
        const task = await (await TaskDataService.getAll()).data.tasks;
        const listTime = task.map(task => task.time);
        const listName = task.map(task => task.actionName.map(name => name.name))[0];
        if (listTime.includes(finalTime)) {
            // console.log(listTime.indexOf(finalTime));
            const number = listName.indexOf(name);
            await TaskDataService.updateAction(finalTime, name, action, number, number);
        } else {
            if (name === listName[0]) {
                await TaskDataService.create(finalTime, name, action, '0');
            } else {
                await TaskDataService.create(finalTime, listName[0], " ", '0');
            }
            for (var i=1; i<listName.length; i++) {
                if (name === listName[i]) {
                    await TaskDataService.updateTaskAndNumber(finalTime, listName[i], action, i);
                } else {
                    await TaskDataService.updateTaskAndNumber(finalTime, listName[i], " ", i);
                }        
            }
        }
        this.props.handleClose();
    }

    render() {
        const { showModal, handleClose } = this.props;
        return (
            <div className="modal">
                <Modal show={showModal}>
                    <div className="modal-form" >
                        <form className="form-custom">
                            <Modal.Header>
                                <Modal.Title className="modal-title">タスク追加</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form inline>
                                    <Form.Group>
                                        <Form.Label className="modal-label-2line">タイムライン</Form.Label>
                                        <Form.Control id="time" className="time-input" />
                                        <Form.Control as="select" className="select-box" id="hourDay">
                                            <option>時間</option>
                                            <option>⽇</option>
                                        </Form.Control>
                                        <Form.Control as="select" className="select-box" id="beforeAfter">
                                            <option>前</option>
                                            <option>後</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                                <Form inline>
                                    <Form.Group>
                                        <Form.Label className="modal-label">タスク</Form.Label>
                                        <Form.Control className="input-task" id="action" placeholder="タスク" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" className="button-apply" onClick={this.handleSubmit}>OK</Button>
                                <Button variant="secondary" onClick={handleClose} className="button-close">Cancel</Button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddActionModal;