// constants
const initialData = {
  loggedIn: false,
};
export const LOGIN = "LOGIN";

// reducer

const reducer = (state = initialData, action: any) => {
  switch (action.type) {
    case LOGIN:
      break;

    default:
      return state;
  }
};

export default reducer;
// action creators
