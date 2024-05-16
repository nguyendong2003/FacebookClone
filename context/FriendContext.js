import createDataContext from "./createDataContext";
import SpringServer from "../api/SpringServer";

const friendReducer = (state, action) => {
  switch (action.type) {
    case "GET_FRIENDS":
      return { ...state, friends: action.payload };
    case "GET_FRIEND_REQUESTS":
      return { ...state, friendRequests: action.payload };
    case "SEARCH_USER":
      return { ...state, searchResult: action.payload };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getFriends = (dispatch) => {
  return async () => {
    try {
      const response = await SpringServer.get("/friend/friendList");
      dispatch({ type: "GET_FRIENDS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with getting friends",
      });
    }
  };
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

const searchUser = (dispatch) => {
  return async (search) => {
    try {
      const response = await SpringServer.get(`/friend/searchUser`, {
        params: { name: search },
      });
      dispatch({ type: "SEARCH_USER", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with searching user",
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  friendReducer,
  { getFriendRequests, getFriends, acceptFriendRequest, rejectFriendRequest, searchUser },
  { friends: [], friendRequests: [], searchResult: [], errorMessage: ""}
);
