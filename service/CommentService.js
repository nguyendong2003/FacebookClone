import SpringServer from "../api/SpringServer";

export const getCommentsByPostId = async (id) => {
  const response = await SpringServer.get(
    `/facebook.api/post/comments/${id}`
  );
  return response.data;
};

export const createComment = async (formData) => {
  return await SpringServer.post(
    `/facebook.api/post/comments/createComment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
