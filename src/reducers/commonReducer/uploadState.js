import { actionsTypes } from "../../constants/actionsTypes";

const initState = {
  percent: 0,
  requestFileCnt: 0,
  successFileCnt: 0,
}

export default function uploadState(state = initState, action) {
  switch (action.type) {
    case actionsTypes.UPDATE_PERCENT:
      return { ...state, percent: action.percent };
    case actionsTypes.UPDATE_REQUEST_FILE_COUNT:
      return { ...state, percent: action.reqCnt };
    case actionsTypes.UPDATE_SUCCESS_FILE_COUNT:
      return { ...state, percent: action.successCnt };
    default:
      return state;
  }
}
