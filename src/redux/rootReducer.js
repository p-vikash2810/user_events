import { combineReducers } from "redux";
import activeUserReducer from "./activeUser/activeUserReducer";
import recordsReducer from "./records/recordReducer";
import userReducer from "./users/usersReducer";

const rootReducer = combineReducers({
  users: userReducer,
  activeUser: activeUserReducer,
  records: recordsReducer
});

export default rootReducer;
