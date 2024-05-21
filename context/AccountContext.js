import createDataContext from "./createDataContext";
import SpringServer from "../api/SpringServer";

const accountReducer = (state, action) => {
  switch (action.type) {
    case "GET_ACCOUNT":
      return { ...state, account: action.payload };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getAccount = (dispatch) => {
  return async () => {
    try {
      const response = await SpringServer.get("/account/getUserAccount");

      dispatch({ type: "GET_ACCOUNT", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with getting account",
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  accountReducer,
  { getAccount },
  { account: null, errorMessage: "" }
);
