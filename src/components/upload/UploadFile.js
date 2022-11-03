import React, { useCallback, useEffect } from 'react';
import '../../css/uploadFile.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateRequestFileCount, updateSuccessFileCount } from "../../actions/actionCreator";
import requestUpload from '../../api/requestUpload';
import UploadBox from './UploadBox';

function UploadFile() {
  const dispatch = useDispatch();
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);

  useEffect(() => {
    console.log("gomgom uploadState", uploadState);
    alert("데이터 저장 완료됐습니다.");
  }, [uploadState])

  const handleResponse = useCallback((data) => {
    if (data === "SUCCESS") {
      return dispatch(updateSuccessFileCount(parseInt(uploadState.successFileCnt + 1)));
      // alert("데이터 저장 완료됐습니다.");
    }
    if (data === "FAIL") {
      // alert("데이터 저장에 실패했습니다.");
      return;
    }
    // alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
  }, [dispatch, uploadState.successFileCnt]);

  const handleResponseError = useCallback((data) => {
    if (data === "ERR_NETWORK") {
      alert("네트워크 오류입니다. 다시 시도해주세요.");
      return;
    }
    if (data === "ERR_BAD_RESPONSE") {
      alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    alert("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
  }, []);

  // file upload
  const fileUpload = useCallback((fileList) => {
    const fd = new FormData();
    dispatch(updateRequestFileCount(fileList.length))
    // Save file data
    Object.values(fileList).forEach((file) => fd.append("file", file));
    (async () => {
      try {
        const res = requestUpload(fd);
        handleResponse(res.data);
      } catch (err) {
        console.log("gomgom err", err);
        handleResponseError(err.code);
      }
    })();
  }, [dispatch, handleResponse, handleResponseError]);

  return (
    <UploadBox
      onFileUpload={fileUpload}
    />
  );
};

export default UploadFile;
