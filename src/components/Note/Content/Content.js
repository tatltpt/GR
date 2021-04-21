/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext, useRef } from "react";
import "./Content.css";
import NoteDataService from "../../../services/note.service";
import AppContext from "../../../AppContext";
import { auth } from "../../../firebase";
import { Button } from "react-bootstrap";
import arrowExtend from "../../../assets/arrow-extend.png";
import arrowShrink from "../../../assets/arrow-shrink.png";
import { Editor } from '@tinymce/tinymce-react';
import SendNote from "../../SendNote/SendNote";
import DropdownButton from 'react-bootstrap/DropdownButton';
import ShareHistory from "../../SendNote/ShareHistory";
import PDF from "../../SendNote/PDF";


const content = (props) => {
  // eslint-disable-next-line no-undef
  const context = useContext(AppContext);
  const isLocked = context.noteSelected.isLocked;
  const [content, setTextContent] = useState(context.noteSelected.content);
  const [isChange, setIsChange] = useState(false);
  const textAreaEl = useRef(null);
  useEffect(() => {
    // if content undefine or newNote, set text empty
    setTextContent(props.isNewNote ? "" : context.noteSelected.content || "");
    // case: select noteItem when processing createNote => hide save button
    setIsChange(false);
    // props.isNewNote && textAreaEl.current.focus();
  }, [context.noteSelected.content, props.isNewNote]);

  const handleClickSave = async () => {
    if (content === "") {
      alert('Content must not be empty');
      return;
    }
    const version = dateToMiliSecond(new Date());
    try {
      (await props.isNewNote)
        ? props.handleCreateNewNote(content, version)
        : updateNote(version);
      await props.reloadNoteList();
    } catch (error) {
      console.log(error);
    }
    setIsChange(false);
  };
  const updateNote = (version) => {
    const detail = context.noteSelected.detail;
    detail.push({ content: content, version: version });
    NoteDataService.update(context.noteSelected._id, { content, version, detail });
  }

  const handleClickExtend = async (check) => {
    if (check === 1) {
      document.getElementById("extend").style.display = "none"
      document.getElementById("shrink").style.display = "inline-block"
    } else {
      document.getElementById("extend").style.display = "inline-block"
      document.getElementById("shrink").style.display = "none"
    }
    try {
      props.extendContent(check);
      await props.reloadNoteList();
    } catch (error) {
      console.log(error);
    }
  };

  const dateToMiliSecond = (date) => {
    const dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateStr;
  }

  const handleChange = (content, editor) => {
    setTextContent(content);
    setIsChange(true);
    // if ((e.ctrlKey || e.metaKey) && e.which === 13){
    //   handleClickSave();
    // }
  };
  // console.log(content);
  return (
    <>
      <div className="contentHeader">
        <div className="textHeader">
          <img id="extend" onClick={() => { handleClickExtend(1) }} alt="extend" className="arrowExtend" src={arrowExtend} />
          <img id="shrink" onClick={() => { handleClickExtend(2) }} alt="shrink" className="arrowShrink" src={arrowShrink} />
          Content
        </div>
        {isChange && (
          <Button
            variant="light"
            size="sm"
            className="editButton"
            onClick={handleClickSave}
          >
            Save
          </Button>
        )}
        {!isLocked ?
          <DropdownButton title="Share">
            <SendNote />
            <ShareHistory />
            <PDF />
          </DropdownButton>
          :
          <h3>This note has been locked!</h3>
        }

        <Button
          onClick={() => {
            auth.signOut();
          }}
          variant="outline-warning"
        >
          Logout
        </Button>
      </div>

      {!isLocked ?
        <div>
          <input id="my-file" type="file" name="my-file" style={{ display: "none" }} onChange="" />
          <Editor
            ref={textAreaEl}
            value={content}
            entity_encoding="utf-8"
            apiKey="hwk3ob6qdpu25fxt029773yb46bxv7gdb9i4mqo32pti7bzm"
            init={{
              height: 500,
              // selector: '#editor',
              image_title: true,
              menubar: false,
              plugins: [
                'advlist autolink lists link image emoticons ',

              ],
              file_picker_types: 'image',
              toolbar:
                'undo redo | formatselect | bold italic | ' +
                'bullist numlist| image | forecolor backcolor | emoticons',
              file_browser_callback_types: 'image',
              file_picker_callback: function (callback, value, meta) {
                if (meta.filetype === 'image') {
                  var input = document.getElementById('my-file');
                  input.click();
                  input.onchange = function () {
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      console.log('name', e.target.result);
                      callback(e.target.result, {
                        alt: file.name
                      });
                    };
                    reader.readAsDataURL(file);
                  };
                }
              }
            }}
            onEditorChange={handleChange}
          />
        </div>
        :
        <div>
          <h3>You can't access this note!</h3>
        </div>
      }

    </>
  );
};

export default content;
