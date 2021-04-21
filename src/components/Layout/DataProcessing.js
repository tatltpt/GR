import React, { Component } from "react";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TripadvisorDataService from "../../services/tripadvisorhanoi";
import MenuAction from "./MenuAction";

class DataProcessing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    // componentDidUpdate() {
    //     this.fetchInitData();
    // }

    fetchInitData = async () => {
        const data = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        console.log(data);
        this.setState({data});
    }

    handleInputChange(e, id) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value) {
            window.alert(`Data có id: ${id} sẽ được chọn là 1 trong 5 khách sạn đề cử`);
        }
      }

    render() {
        const { data } = this.state;
        return (<>
            <div className="menubar">
                <MenuAction />
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>District</th>
                            <th>Place</th>
                            <th>Convenient</th>
                            <th>Room type</th>
                            <th>Comment</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) =>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.district}</td>
                                <td>{data.place}</td>
                                <td>{data.convenient.length}</td>
                                <td>{data.roomtype.length}</td>
                                <td>{data.comment.length + 32}</td>
                                <td>1234567 VND</td>
                                <td><input type="checkbox" onChange={(e) => this.handleInputChange(e, data._id)}/>
                                <Button variant="secondary" size="sm" >Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            </>
        );
    }
}

export default DataProcessing;
