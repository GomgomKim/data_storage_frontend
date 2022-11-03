import axios from 'axios';
import { apiKeys } from '../constants/apiKeys';
import serverInfo from '../constants/serverInfo';

function requestUpload(file) {
  const { PROTOCOL, IP, PORT } = serverInfo;
  const serverUrl = `${PROTOCOL}://${IP}:${PORT}`;
  let progress = 0;
  let timerId = null;

  const timer = () => {
    if (progress < 98) {
      const diff = 100 - progress;
      const inc = diff / (10 + progress * (1 + progress / 100)); // 증가값
      setProgress(progress + inc);
    }
    timerId = setTimeout(timer, 50); // 50 ms 단위로 timer 재귀호출
  }

  const setProgress = (value) => {
    progress = value;
    console.log("progress :", progress);
    // TODO
    // UI 업데이트 부분을 구현하지 못했습니다. 
  }

  const defaultClient = axios.create({
    baseURL: serverUrl,
    headers: {
      'Content-Type': 'multipart/form-data;',
    }
  })
   
  defaultClient.defaults.timeout = 3000;
   
  defaultClient.interceptors.request.use(function (config) {
    // console.log("interceptors config", config);
    setProgress(0);
    timer();
    return config
  }, function (error) {
    return Promise.reject(error);
  });
   
  defaultClient.interceptors.response.use(function (response) {
    // console.log("interceptors response", response);
    if (timerId) {
      clearTimeout(timerId);    // HTTP 응답시 timer 해제
      timerId = null;
    }
    setProgress(100);
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return defaultClient.post(apiKeys.uploadCsv, file);
  // return defaultClient;
}
export default requestUpload;
