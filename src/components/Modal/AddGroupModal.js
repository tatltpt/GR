import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import Form from 'react-bootstrap/Form';
import "./Modal.css";
import GroupDataService from "../../services/group.service";
import TaskDataService from "../../services/task.service";

class AddGroupModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullscreen: false,
		};
	}

	handleSubmit = async () => {
		const name = document.getElementById('name').value;
		const task = await (await TaskDataService.getAll()).data.tasks;
		let listName = task.map(task => task.actionName.map(name => name.name))[0];
		const listTime = task.map(task => task.time);
		if (!listName) {
			listName = [];
		}
		if (listName.includes(name)) {
			return window.alert('グループ名は存在した!');
		}
		const number = listName.length;
		await GroupDataService.create(name, number);
		if (listTime.length >= 1) {
			for (var i=0; i<listTime.length; i++) {
				await TaskDataService.updateTaskAndNumber(listTime[i], name, " ", number);
			}
		} else {
			await TaskDataService.create("0h", name, " ", number);
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
								<Modal.Title className="modal-title">グループ追加</Modal.Title>
							</Modal.Header>
							<Modal.Body>
							<Form inline>
								<Form.Group>
									<Form.Label className="modal-label">グループ名:</Form.Label>
									<Form.Control id="name" placeholder="グループ名" />
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

export default AddGroupModal;