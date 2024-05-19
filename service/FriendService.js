import SpringServer from "../api/SpringServer";

export const getFriendsByAccountId = async (id) => {
  const response = await SpringServer.get(`/friend/friendList/${id}`);
  return response.data;
};
