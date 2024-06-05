import SpringServer from "../api/SpringServer";

export const getCommentsByPostId = async (id) => {
  const response = await SpringServer.get(
    `/facebook.api/post/comments/${id}`
  );
  return response.data;
};

export const createComment = async (formData) => {
  const response =  await SpringServer.post(
    `/facebook.api/post/comments/createComment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data
};

export const getPostOfComment = async(id) => {
  const response =  await SpringServer.get(
    `/facebook.api/post/comments/getPostOfComment/${id}`
  );
  return response.data;
}