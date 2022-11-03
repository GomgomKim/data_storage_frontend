import React, { useState, useRef } from 'react';
import '../css/uploadFile.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateSuccessFileCount } from "../actions/actionCreator";
import requestUpload from '../api/requestUpload';

function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);

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
      fileUpload(e.dataTransfer.files);
    }
  };

  // file upload
  const fileUpload = (fileList) => {
    const fd = new FormData();
    // Save file data
    Object.values(fileList).forEach((file) => fd.append("file", file));
    (async () => {
      try {
        const res = requestUpload(fd);
        switch(res.data) {
          case "SUCCESS":
            dispatch(updateSuccessFileCount(parseInt(uploadState.successFileCnt + 1)));
            // alert("데이터 저장 완료됐습니다.");
            break;
          case "FAIL":
            // alert("데이터 저장에 실패했습니다.");
            break;
          default:
            // alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
            break;
        }
      } catch (err) {
        console.log("gomgom err", err);
        switch(err.code) {
          case "ERR_NETWORK":
            alert("네트워크 오류입니다. 다시 시도해주세요.");
            break;
          case "ERR_BAD_RESPONSE":
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            break;
          default:
            alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
            break;
        }
      }
    })();
  }

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} />
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
  );
};

export default UploadFile;
