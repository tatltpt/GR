import React, { Component } from "react";
import "./Layout.css";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import TaskDataService from "../../services/task.service";
import BookingDataService from "../../services/bookinghanoi";
import TripadvisorDataService from "../../services/tripadvisorhanoi";
import RunningModal from "../Modal/RunningModal";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            runData: '1',
        }
    }

    componentDidUpdate() {
        if (this.state.runData !== '1') {
            this.handleMergeData();
            this.setState({
                openModal: false,
                runData: '1',
            });
        }
    }

    handleStart = async () => {
        // this.setState({
        //     openModal: true,
        // });
        // const run = await (await TaskDataService.run()).data;
        // await this.setState({
        //     runData: run,
        // });
    }

    handleMergeData = async () => {
        const dataBooking = await (await BookingDataService.getAll()).data.bookinghanoi;
        const dataTripadvisor = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        const listName = dataTripadvisor.map(dataTripadvisor => dataTripadvisor.name);
        for (var i = 0; i < dataBooking.length; i++) {
            if (listName.includes(dataBooking[i].name)) {
                await TripadvisorDataService.updateDataHotel(dataBooking[i].name, dataBooking[i].roomtype, dataBooking[i].comment);
            }
        }
        const number = dataTripadvisor.length;
        // const data = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        // this.setState({data});
        return window.alert(`Crawl thành công, dữ liệu hiện tại có ${number} bản ghi`);
    }

    render() {
        const { openModal } = this.state;
        return (
            <div>
                <RunningModal
                    showModal={openModal}
                />
                <Form inline className="form" >
                    <Form.Label className="form-label">Select website to crawl: </Form.Label>
                    <Form.Control as="select" id="cityName" className="form-control">
                        <option>tripadvisor.com.vn</option>
                        <option>booking.com</option>
                        <option>ivivu.com</option>
                        <option>agoda.com</option>
                    </Form.Control>
                    <Button variant="primary" className="button-start" onClick={this.handleStart}>Start</Button>
                </Form>
            </div>
        );
    }
}
export default Body;