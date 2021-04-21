import React, { Component } from "react";
import "./Header.css";
import { PeopleFill } from 'react-bootstrap-icons';
class Header extends Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    onClickButton() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    handleClickOutside(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    render() {
        return (
            <div className="header">
                <div className="dropdown" ref={this.wrapperRef}>
                    <button onClick={this.onClickButton} className="dropbtn" >
                        <PeopleFill />
                    </button>
                    <div id="myDropdown" className="dropdown-content">
                        <a href="#add">Add People To</a>
                        <a href="#share">Share Note</a>
                    </div>
                </div>

            </div>
        );
    }
}
export default Header;
