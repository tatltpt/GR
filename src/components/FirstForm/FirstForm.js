import React, { Component } from "react";
import "./FirstForm.css";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import SecondForm from "../SecondForm/SecondForm";
import { lsWithGrep } from "../../helpers/testShell";

class FirstForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstPage: true,
            name: '',
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    handleChangePage = async (event) => {
        this.setState({
            isFirstPage: false,
            name: document.getElementById('name').value
        });
        
        // lsWithGrep();
        
    }

    render() {
        const { isFirstPage, name } = this.state;
        return (
            <div>
                {isFirstPage ? (
                <div>
                    <div>
                        <Row>
                            <Col md={12} className="border-right">
                                <HeaderPage1 />
                            </Col>
                        </Row>
                    </div>
                    <div className="form">
                        <Form>
                            <Form.Group>
                                <Form.Label>名称:</Form.Label>
                                <Form.Control id="name" placeholder="名称" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>ベース⽇:</Form.Label>
                                <Form.Control id="day" type="date" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>ベース時刻:</Form.Label>
                                <Form.Control id="time" type="time" />
                            </Form.Group>

                            <Button variant="primary" size="lg" className="form-button" onClick={this.handleChangePage}>
                                OK
                            </Button>
                        </Form>
                    </div>
                </div>
                ) : (
                    <div>
                        <div>
                            <Row>
                                <Col md={12} className="border-right">
                                    <HeaderPage2 />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 className="page-title">{name}</h3>
                        </div>
                        <div>
                            <SecondForm />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const HeaderPage1 = () => {
    return (
      <div className="App-header">
        ⾏動計画 新規作成
      </div>
    );
};

const HeaderPage2 = () => {
    return (
      <div className="App-header">
        タイムライン
      </div>
    );
};


export default FirstForm;
