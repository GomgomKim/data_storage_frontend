import React, { useState, useRef, useEffect } from 'react';
import '../css/uploadFile.css';
import HttpClient from '../api/HttpClient';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const UploadFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);


  useEffect(() => {
    console.log(uploadState);
      // (async () => {
      //   // 브라우저 알림
      //   const showNotification = () => {
      //     const notification = new Notification('완료', {
      //         body: data.content
      //     });
          
      //     setTimeout(() => {
      //         notification.close();
      //     }, 10 * 1000);
          
      //     notification.addEventListener('click', () => {
      //         window.open(data.url, '_blank');
      //     });
      //   }

      //   // 브라우저 알림 허용 권한
      //   let granted = false;

      //   if (Notification.permission === 'granted') {
      //       granted = true;
      //   } else if (Notification.permission !== 'denied') {
      //       let permission = await Notification.requestPermission();
      //       granted = permission === 'granted';
      //   }

      //   // 알림 보여주기
      //   if (granted) {
      //       showNotification();
      //   }
      // })();

  }, [])

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
    HttpClient.UploadFile(fd);
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