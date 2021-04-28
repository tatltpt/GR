import React, { Component } from "react";
import "./ListEvent.css";
import Header from '../Layout/Header'
class ListEvent extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="div-border">
                    <div>
                        Create User Name
                        </div>
                        <img className="img"
                            src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6"
                        />
                    <div>
                    <span className="span-bold">Giai chay quoc te</span><br/>
                        <span>Ngay to chuc: 01/01/2021</span><br/>
                        <span>Dia diem: Ha Noi</span>
                    </div>
                </div>
                <div className="div-border">
                    <div>
                        Create User Name
                        </div>
                        <img className="img"
                            src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6"
                        />
                    <div>
                    <span className="span-bold">Giai chay quoc te</span><br/>
                        <span>Ngay to chuc: 02/02/2021</span><br/>
                        <span>Dia diem: Da Nang</span>
                    </div>
                </div>
                <div className="div-border">
                    <div>
                        Create User Name
                        </div>
                        <img className="img"
                            src="https://img.bibpix.net/photos/thumb/5f99913e444e670e2b173cc3/4a73f0104bba26a623464f0b039f7dff.jpg?v=6"
                        />
                    <div>
                        <span className="span-bold">Giai chay quoc te</span><br/>
                        <span>Ngay to chuc: 03/03/2021</span><br/>
                        <span>Dia diem: Ho Chi Minh</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default ListEvent;