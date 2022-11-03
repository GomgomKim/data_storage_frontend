import { types } from "../../constants/actionsTypes";

const percent = 0;
const requestFileCnt = 0;
const successFileCnt = 0;

export default function uploadState(state = percent, action) {
  switch (action.type) {
    case types.UPLOAD_STATE:
      return { percent: action.data };
    case types.UPLOAD_STATE:
      return { percent: action.data };
    case types.UPLOAD_STATE:
      return { percent: action.data };
    default:
      return state;
  }
}
