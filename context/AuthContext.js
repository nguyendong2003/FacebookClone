import createDataContext from "./createDataContext";
import SpringServer from "../api/SpringServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, token: action.payload };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signIn = (dispatch) => {
  return async ({ email, password }, navigation) => {

    try {
      const response = await SpringServer.post("/auth/login", {
        username: email,
        password,
      });
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      await AsyncStorage.setItem("token", response.data.token);
      // navigation.navigate("TabNavigationHome");
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with sign in",
      });
      Alert.alert("Error", "Something went wrong with sign in");
    }
  };
};

const checkLoggedIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "SIGN_IN", payload: token });
    }
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signIn, checkLoggedIn },
  { token: null, errorMessage: "" }
);
