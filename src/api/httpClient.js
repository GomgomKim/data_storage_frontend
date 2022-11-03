import axios from 'axios';
import { serverInfo } from '../constants/serverInfo';
import { apiKeys } from "../constants/apiKeys";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updatePercent, updateRequestFileCount, updateSuccessFileCount } from "../actions/actionCreator";

function HttpClient() {
  const dispatch = useDispatch();
  const uploadState = useSelector((state) => state.commonReducer.uploadState, shallowEqual);
  const serverUrl = serverInfo.PROTOCOL + "://" + serverInfo.IP + ":" + serverInfo.PORT;
  
  const uploadFile = (file) => {
    axios.post(serverUrl + apiKeys.uploadCsv, file, {
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
      baseURL: serverUrl
    })
    .then((res) => {
      console.log("gomgom res", res);
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
}
export default HttpClient;