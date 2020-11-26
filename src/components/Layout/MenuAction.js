import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Layout.css";
import Form from 'react-bootstrap/Form';

class MenuAction extends Component {

    handleOk = () => {
        console.log("ok");
    }

    handleInputChange = () => {
        // this.setState({
        //     query: this.search.value
        // })
        // this.filterArray();
        console.log(this.search.value);
    }


    render() {
        return (
            <div className="menu-action">
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={this.handleOk} style={{color: "red"}}>Filter comments</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={this.handleOk} style={{color: "red"}}>Price Comparing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{color: "red"}}>Search by city: 
                            <Form as="select" style={{"margin-left": "5px", border: "none", "background-color": "white", color: "red" }}>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                                <option>Đà Lạt</option>
                                <option>Hồ Chí Minh</option>
                            </Form>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{color: "red" }}>                           
                            <input type="text" style={{"margin-left": "5px",border: "none", "width": "300%", "background-color": "white", color: "red" }} placeholder="Search by name..." ref={input => this.search = input} onChange={this.handleInputChange}/>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}
export default MenuAction;