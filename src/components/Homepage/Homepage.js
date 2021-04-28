import React, { Component } from "react";
import "./Homepage.css";
import {Col, Row, Card, Image} from "react-bootstrap";
import Header from '../Layout/Header'

class Homepage extends Component {
  render() {
      return (
          <>
              <Header/>
              <div class="page-content">
              <Card>
                <Image src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6" fluid />                
                  <Row>
                    <Col xs={6} md={3}>
                      <Image src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6" thumbnail />
                    </Col>
                    <Col xs={6} md={3}>
                      <Image src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6" thumbnail />
                    </Col>
                    <Col xs={6} md={3}>
                      <Image src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6" thumbnail />
                    </Col>
                    <Col xs={6} md={3}>
                      <Image src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6" thumbnail />
                    </Col>
                  </Row>
              </Card>
              </div>
          </>
      );
  }
}

export default Homepage;
