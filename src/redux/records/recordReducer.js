import { ADD_RECORD, DELETE_RECORD, UPDATE_RECORD } from "./recordsActionType";

const initialState = {};
const inirialAction = { data: { id: null } };
const recordsReducer = (state = initialState, action = inirialAction) => {
  if (action.data) {
    var { id, activeUser, record } = action.data;
  }

  switch (action.type) {
    case ADD_RECORD:
      const recArr = state[activeUser]
        ? [...state[activeUser], record]
        : [record];
      return { ...state, [activeUser]: recArr };

    case UPDATE_RECORD:
      const updatedData = [...state[activeUser]];
      console.log("updatedData", updatedData);

      updatedData.splice(id, 1, record);
      return {
        ...state,
        [activeUser]: updatedData,
      };
    case DELETE_RECORD:
      const filteredRecords = state[activeUser].filter(
        (rec, index) => index !== id
      );
      console.log("filteredRecords", filteredRecords);

      return {
        ...state,
        [activeUser]: filteredRecords,
      };

    default:
      return state;
  }
};

export default recordsReducer;
