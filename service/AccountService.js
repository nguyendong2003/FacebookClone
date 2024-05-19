import SpringServer from "../api/SpringServer";

export const getAccountById = async (id) => {
  const response = await SpringServer.get(`/account/getUserAccount/${id}`);
  return response.data;
};
