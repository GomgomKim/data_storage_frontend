import React, { useState, useRef, useEffect } from 'react';
import '../css/uploadFile.css';
import axios from 'axios'; 

const UploadFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/saveData/connect/id="+Math.random());
    eventSource.addEventListener("sse", function (event) {
      console.log("percent :",event.data);

      const data = JSON.parse(event.data);

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
    })
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
      console.log(e.dataTransfer.files[0]);
      fileUpload(e.dataTransfer.files)
    }
  };

  // file upload
  const fileUpload = (fileList) => {
    // console.log("gomgom fileList", fileList);
    const fd = new FormData();
    // 파일 데이터 저장
    Object.values(fileList).forEach((file) => fd.append("file", file));
    console.log("gomgom fd", fd);

    axios.post('http://localhost:8080/saveData/create-csv', fd, {
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
      baseURL: 'http://localhost:8080'
    })
    .then((res) => {
      console.log("gomgom res", res);
      switch(res.data) {
        case "SUCCESS":
          alert("데이터 저장 완료됐습니다.");
          break;
        case "FAIL":
          alert("데이터 저장에 실패했습니다.");
          break;
        default:
          alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
          break;
      }
    })
    .catch((err) => {
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
    });
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