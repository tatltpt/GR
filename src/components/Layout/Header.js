import React, { Component } from "react";
import "./Layout.css";
import { Button, Form, FormControl, Nav} from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar'

class Header extends Component {

    render() {
        return (
            <div >
                {/* <Form inline style={{marginLeft: '30%'}}>
                    <Form.Control id="day" />
                    <Button variant="secondary" style={{marginLeft: '10px'}}>
                        <Search/>
                    </Button> 
                </Form> */}
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Trang chủ</Nav.Link>
                        <Nav.Link href="/list-event">Danh sách sự kiện</Nav.Link>
                        <Nav.Link href="#pricing">Danh sách sự kiện của user</Nav.Link>
                        <Nav.Link href="#4">Tạo sự kiện</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Tìm kiếm" className="mr-sm-2" />
                        <Button variant="outline-light">Tìm kiếm</Button>
                    </Form>
                </Navbar>             
            </div>
        );
    }
}
export default Header;