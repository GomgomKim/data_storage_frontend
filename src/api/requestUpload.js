import axios from 'axios';
import { apiKeys } from "../constants/apiKeys";
import serverInfo from '../constants/serverInfo';

function requestUpload(file) {
  const { PROTOCOL, IP, PORT } = serverInfo;
  const serverUrl = `${PROTOCOL}://${IP}:${PORT}`;
  return axios.post(serverUrl + apiKeys.uploadCsv, file, {
    headers: {
      "Content-Type": `multipart/form-data;`,
    },
    baseURL: serverUrl
  });
}
export default requestUpload;
