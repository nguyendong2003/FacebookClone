import SpringServer from "../api/SpringServer";

export const getFriendsByAccountId = async (id) => {
  const response = await SpringServer.get(`/friend/friendList/${id}`);
  return response.data;
};

export const searchUser = async (search) => {
  const response = await SpringServer.get(`/friend/searchUser`, {
    params: { name: search },
  });
  return response.data;
};

export const getProfileStatus = async (id) => {
  const response = await SpringServer.get(`/friend/profileStatus/${id}`);
  return response.data;
}