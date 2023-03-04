import { SET_ACTIVE_USER } from "./activeUserActionType";

const initialState = {};
const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return action.data;

    default:
      return state;
  }
};

export default activeUserReducer;
