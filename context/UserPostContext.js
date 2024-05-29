import createDataContext from "./createDataContext";
import SpringServer from "../api/SpringServer";

const UserPostReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "RELOAD_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const reloadPost = (dispatch) => {
  return async (id) => {
    try {
      const response = await SpringServer.get(
        `/facebook.api/posts/getPostById/${id}`
      );
      dispatch({ type: "RELOAD_POST", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",

        payload: "Something went wrong with getting posts",
      });
    }
  };
};

const getPosts = (dispatch) => {
  return async () => {
    try {
      const response = await SpringServer.get(
        `facebook.api/posts/getPersonalPost`
      );

      dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with getting posts",
      });
    }
  };
};

const createPost = (dispatch) => {
  return async ({ content, images, view_mode, share_id = 0 }) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("view_mode", view_mode == 1 ? "public" : "private");
    formData.append("shareId", share_id);

    if (images != null) {
      images.forEach((imageUri, index) => {
        formData.append("images", {
          name: `image${index}.jpg`,
          type: "image/jpeg",
          uri: imageUri,
        });
      });
    }

    await SpringServer.post("/facebook.api/posts/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    await getPosts(dispatch)();
  };
};

const getPostById = (dispatch) => {
  return async (postId) => {
    try {
      const response = await SpringServer.get(
        `/facebook.api/posts/getPostById/${postId}`
      );
      dispatch({ type: "UPDATE_POST", payload: response.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong with getting posts",
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  UserPostReducer,
  { getPosts, createPost, getPostById, reloadPost },
  { posts: [], errorMessage: "" }
);
