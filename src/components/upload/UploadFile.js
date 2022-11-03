import React, { useCallback, useEffect, useState } from 'react';
import '../../css/uploadFile.css';
import { useSelector, shallowEqual } from 'react-redux';
import requestUpload from '../../api/requestUpload';
import sse from '../../api/sse';
import UploadBox from './UploadBox';
import UploadProgress from './UploadProgress';

function UploadFile() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);

  useEffect(() => {
    // if(progress === 100){
    //   // 응답완료 시, initProgress 콜백 호출
    //   setActive(true);
    //   setProgress(100);
    //   initProgress();
    // } else{
      // progress 가 변할때마다 state 갱신
      // setActive(true);
      // setProgress(progress);
    // }
  }, [])

  const handleResponse = useCallback((data) => {
    if (data === "SUCCESS") {
      alert("데이터 저장 완료됐습니다.");
    }
    else if (data === "FAIL") {
      alert("데이터 저장에 실패했습니다.");
      return;
    }
    else {
      alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
  }, []);

  const handleResponseError = useCallback((data) => {
    if (data === "ERR_NETWORK") {
      alert("네트워크 오류입니다. 다시 시도해주세요.");
      return;
    }
    else if (data === "ERR_BAD_RESPONSE") {
      alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    else if (data === "ECONNABORTED"){
      alert("데이터 저장 완료됐습니다.");
    }
    else {
      alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
    }
  }, []);

  // file upload
  const fileUpload = useCallback((fileList) => {
    const fd = new FormData();
    // Save file data
    Object.values(fileList).forEach((file) => fd.append("file", file));
    (async () => {
      try {
        requestUpload(fd)
        .then((res) => {
          handleResponse(res.data);
        })
        .catch((err) => {
          handleResponseError(err);
        });
      } catch (err) {
        handleResponseError(err.code);
      }
    })();
  }, [handleResponse, handleResponseError]);

  // progress init
  const initProgress = () => {
    setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 1000)
  }

  return (
    <>
    <UploadBox
      onFileUpload={fileUpload}
    />
    <UploadProgress
      active={active} 
      progress={progress}
    />
    </>
  );
};

export default UploadFile;
