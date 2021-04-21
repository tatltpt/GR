import "./createButton.css";
import React from "react";
import { Button } from "react-bootstrap";

const createButton = (props) => {
  return (
    <div className="createButton">
      <Button
        className="button"
        variant="light"
        size="sm"
        onClick={props.handleClick}
      >
        {props.nameButton}
      </Button>
    </div>
  );
};

export default createButton;
