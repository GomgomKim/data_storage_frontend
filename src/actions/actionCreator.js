import { actionsTypes } from "../constants/actionsTypes";

// file upload state
export const updatePercent = (percent) => ({ type: actionsTypes.UPDATE_PERCENT, percent });
export const updateRequestFileCount = (reqCnt) => ({ type: actionsTypes.UPDATE_REQUEST_FILE_COUNT, reqCnt });
export const updateSuccessFileCount = (successCnt) => ({ type: actionsTypes.UPDATE_SUCCESS_FILE_COUNT, successCnt });