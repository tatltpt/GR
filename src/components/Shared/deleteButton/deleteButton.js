import React from "react";
import "./deleteButton.css";
import { Button } from "react-bootstrap";

const deleteButton = (props) => {
  return (
    <div className="deleteFolder">
      <Button
        className="button"
        variant="light"
        size="sm"
        onClick={props.onDelete}
      >
        {props.nameButton}
      </Button>
    </div>
  );
};

export default deleteButton;
