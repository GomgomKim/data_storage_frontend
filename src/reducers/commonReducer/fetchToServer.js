import { actionsTypes } from "../../constants/actionsTypes";

const initState = {};

export default function fetchToServer(state = initState, action) {
  switch (action.type) {
    case actionsTypes.SERVER_ACTION:
      return action.serverAction;
    default:
      return state;
  }
}
