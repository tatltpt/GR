import React, { Component } from "react";
import "./SecondForm.css";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import AddGroupModal from "../Modal/AddGroupModal";
import AddActionModal from "../Modal/AddActionModal";
import GroupDataService from "../../services/group.service";
import TaskDataService from "../../services/task.service";
import Table from 'react-bootstrap/Table';

class SecondForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            openActionModal: false,
            data: [],
            task: [],
            name: '',
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.openModal !== prevState.openModal && !this.state.openModal) {
            this.fetchInitData();
        }
        if (this.state.openActionModal !== prevState.openActionModal && !this.state.openActionModal) {
            this.fetchInitData();
        }
    }

    fetchInitData = async () => {
        const data = await (await GroupDataService.getAll()).data.groups;
        const task = await (await TaskDataService.getAllTask()).data.tasks;
        this.setState({ data, task });
    }

    handleOpenModal = () => {
        this.setState({
            openModal: true,
        });
    }

    handleOpenActionModal = (name) => {
        this.setState({
            openActionModal: true,
            name: name,
        });
    }

    render() {
        const { openModal, openActionModal, name } = this.state;
        return (
            <div className="div-form">
                <AddGroupModal
                    handleClose={() => this.setState({ openModal: false })}
                    showModal={openModal}
                />
                <AddActionModal
                    handleClose={() => this.setState({ openActionModal: false })}
                    showModal={openActionModal}
                    name={name}
                />
                <Table className="table">
                    <tr className="tr-button-table">
                        <td></td>
                        {this.state.data.map((data) => (
                            <td><input type="submit" className={`name-button td${data.number}`} value={data.name} onClick={(e) => this.handleOpenActionModal(data.name, e)} /></td>
                        ))}
                        <input type="submit" className="name-button-group" value="グループ追加" onClick={this.handleOpenModal} />
                    </tr>
                    {this.state.task.map((task) => (
                        <tr>
                            <td className="td-time">{task.time}</td>
                            {task.actionName.map((actionName) => (
                                 <td className={`td td${actionName.number}`}>
                                    {actionName.actions.map((actions) => (
                                        <>{actions.action !== " " ? (
                                            <>★ {actions.action}<br></br></>
                                        ):(
                                            null
                                        )}</>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </Table>
            </div>
        );
    }
}

export default SecondForm;
