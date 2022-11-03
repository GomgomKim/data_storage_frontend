import React, { useState, useRef, useEffect } from 'react';
import '../css/uploadFile.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchToServer } from '../actions/actionCreator'
import { serverActionKey } from '../constants/serverActionKey';
import { updateRequestFileCount } from "../actions/actionCreator";

function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("gomgom uploadState", uploadState);
    
    alert("데이터 저장 완료됐습니다.");
    
  }, [uploadState])

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log("gomgom e.target.files", e.target.files);
    }
  };

  // drag
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      fileUpload(e.dataTransfer.files)
    }
  };

  // file upload
  const fileUpload = (fileList) => {
    const fd = new FormData();
    // Save file data
    Object.values(fileList).forEach((file) => fd.append("file", file));
    dispatch(updateRequestFileCount(fileList.length))
    dispatch(fetchToServer({
      key: serverActionKey.UPLOAD_FILE,
      param: fd
    }));
    console.log("gomgom upload", fd);
  }

  const onButtonClick = () => {
    inputRef.current.click();
  };


  return (
    <>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div> 
      </label>
      { dragActive && 
        <div id="drag-file-element" 
          onDragEnter={handleDrag} 
          onDragLeave={handleDrag} 
          onDragOver={handleDrag} 
          onDrop={handleDrop}>
        </div> }
      <span>{fileName}</span>
    </form>
    </>
  );
};

export default UploadFile;