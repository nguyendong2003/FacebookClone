import createDataContext from "./createDataContext";
import SpringServer from "../api/SpringServer";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const friendReducer = (state, action) => {
  switch (action.type) {
    case "GET_FRIEND_REQUESTS":
      return { ...state, friendRequests: action.payload };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
const getFriendRequests = (dispatch) => {
  return async () => {
    try {
      const response = await SpringServer.get("/friend/getAllRequest");
      dispatch({ type: "GET_FRIEND_REQUESTS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with getting friend requests",
      });
    }
  };
};

const acceptFriendRequest = (dispatch) => {
  return async (friendId) => {
    try {
      await SpringServer.post(`/friend/acceptFriend/${friendId}`);
      await getFriends(dispatch)();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with accepting friend request",
      });
    }
  };
};

const rejectFriendRequest = (dispatch) => {
  return async (friendId) => {
    try {
      await SpringServer.delete(`/friend/rejectFriend/${friendId}`);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with rejecting friend request",
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  friendReducer,
  { getFriendRequests, acceptFriendRequest, rejectFriendRequest },
  { friendRequests: [], errorMessage: ""}
);
