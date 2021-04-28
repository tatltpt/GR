import React, { Component } from "react";
import "./App.css";
import Homepage from './components/Homepage/Homepage';
import Default from "./components/Default/Default";
import verifyPage from './components/SendNote/verifyPage/verifyPage';
import ShowNote from './components/SendNote/ShowNote/ShowNote';
//import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ListEvent from './components/ListEvent/ListEvent';


class App extends Component {

  handleExtendEvent = (check) => {
    if (check === 1){
      document.getElementById("folder-box").style.display = "none"
      document.getElementById("note-box-main").setAttribute("class", "col-100vh col-md-12")
    } else {
      document.getElementById("folder-box").style.display = "block"
      document.getElementById("note-box-main").setAttribute("class", "col-100vh col-md-9")
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/list-event" exact component={ListEvent} />
          <Route path="/home" exact component={Homepage} />
          <Route path="/verify/:shareID" component={verifyPage} />
          <Route path="/showNote/:shareID" component={ShowNote} />
          <Route component={Default} />
        </Switch>
      </BrowserRouter>
    )
  }
}



export default App;
