import SpringServer from "../api/SpringServer";

export const getAccountById = async (id) => {
  const response = await SpringServer.get(`/account/getUserAccount/${id}`);
  return response.data;
};

export const updateDetail = async (data) => {
  const response = await SpringServer.put(`/account/updateDetailInfo`, data);
  return response.data;
}

export const updateDescription = async (data) => {
  const response = await SpringServer.put(`/account/updateDescription`, data);
  return response.data;
}


