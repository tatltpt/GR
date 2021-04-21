import React, { useContext } from "react";
import "./FolderItem.css";
import next from "../../../assets/next.png";
import AppContext from "../../../AppContext";

const folderItem = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(AppContext);
  const folder = props.folder;
  const isActived = props.isActive ? "folderItem actived" : "folderItem";
  return props.isEdit ? (
    <div id={props.id} className={isActived} >
      <input
        onClick={props.handleCheckbox.bind(this, folder)}
        type="checkbox"
      />
      <span
        onClick={props.handleRename.bind(this, folder)}
        className="folderName"
      >
        {folder.name}
      </span>
    </div>
  ) : (
    <div
      className={isActived}
      id={props.id}
      onClick={context.handleSelectFolder.bind(this, folder)}
      onDrop={props.dropNote}
      onDragOver={props.dragOver}
    >
      <span className="folderName">{folder.name}</span>
      <img alt="next" className="nextButton" src={next} />
    </div>
  );
};

export default folderItem;
