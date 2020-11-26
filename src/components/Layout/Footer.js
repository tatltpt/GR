import React from "react";
import "./Layout.css";

class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div className="footer">
            <span>Nguyen Van Hieu &copy; 1998 </span>
            <a
                href="https://www.facebook.com/nguyenvanhieu.supreme/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Su
            </a>
          <a className="footer-time">{this.state.date.toLocaleTimeString()}</a>
        </div>
      );
    }
  }
  
export default Footer;
