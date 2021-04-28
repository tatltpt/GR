import React, { Component } from "react";
import "./ListEvent.css";
import Header from '../Layout/Header'
class ListEvent extends Component {

    render() {
        return (
            <>
                <Header/>
               <div>
                   Create User Name
                </div>
               <div>
                    <img className="img"
                        src="https://bibpix.net/photo?race_id=vhm2020&bib_type=all&img=#cl-group-2"
                    />
               </div>
               <div>
                   <span>Giai chay quoc te</span><br/>
                   <span>Ngay to chuc</span><br/>
                   <span>Dia diem</span>
               </div>
            </>
        );
    }
}
export default ListEvent;