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

const updateDetail = (dispatch) => {
  return async (data) => {
    try {
      await SpringServer.put("/account/updateDetailInfo", data);
      getAccount(dispatch)();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with updating detail",
      });
    }
  };
};

const updateDescription = (dispatch) => {
  return async (data) => {
    try {

      await SpringServer.put("/account/updateDescription", data);
      getAccount(dispatch)();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with updating description",
      });
    }
  };
};
export const { Context, Provider } = createDataContext(
  accountReducer,
  { getAccount, updateDetail, updateDescription },
  { account: null, errorMessage: "" }
);
