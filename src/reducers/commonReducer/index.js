import { combineReducers } from "redux";

import uploadState from "./uploadState";
import fetchToServer from "./fetchToServer";

export default combineReducers({
  uploadState,
  fetchToServer,
});
