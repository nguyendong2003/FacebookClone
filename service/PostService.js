import SpringServer from "../api/SpringServer";

export const getReactionToPost = async (postId) => {
  const response = await SpringServer.get(
    `/facebook.api/post/reactions/getReaction/${postId}`
  );
  return response.data;
};

export const reaction = async ({ id_account, postId, reaction_type }) => {
  formData = new FormData();
  formData.append("id_account", id_account);
  formData.append("id_post", postId);
  formData.append("type", reaction_type);

  const response = await SpringServer.put(
    `/facebook.api/post/reactions/updateReaction`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await SpringServer.get(
    `/facebook.api/posts/getPostById/${postId}`
  );
  return response.data;
};

export const getUserPosts = async (id) => {
  const response = await SpringServer.get(`/facebook.api/posts/${id}`);
  return response.data;
}

export const createPost = async ({ content, images, view_mode, share_id = 0 }) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("view_mode", view_mode);
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

  const response = await SpringServer.post(
    "/facebook.api/posts/createPost",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export const editPost = async ({ postId, view_mode, content, images, files}) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("view_mode", view_mode);
  formData.append("id_post", postId);
  
  if (images != null) {
    images.forEach((imageUrl) => {
      formData.append("images", imageUrl);
    });
  }

  if (files != null) {
    files.forEach((file, index) => {
      formData.append("files", {
        name: `image${index}.jpg`,
        type: "image/jpeg",
        uri: file,
      });
    });
  }

  const response = await SpringServer.patch(
    `/facebook.api/posts/updatePost`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export const deletePost = async (postId) => {
  const response = await SpringServer.delete(`/facebook.api/posts/deletePost/${postId}`);
  return response.data;
}

export const getReactionsOfPost = async (postId) => {
  const response = await SpringServer.get(
    `/facebook.api/post/reactions/${postId}`
  );
  return response.data;
}