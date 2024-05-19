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