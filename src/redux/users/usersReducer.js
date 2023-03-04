const initialState = [
  {
    username: "testUser1",
    email: "testUser1@gmail.com",
    password: "TestUser@1",
  },
];
const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_USER":
      console.log();

      return [...state, action.data];

    default:
      return state;
  }
};

export default userReducer;
