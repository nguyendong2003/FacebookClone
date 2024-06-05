import SpringServer from "../api/SpringServer";

export const getAccountById = async (id) => {
  const response = await SpringServer.get(`/account/getUserAccount/${id}`);
  return response.data;
};

export const updateDetail = async (data) => {
  const response = await SpringServer.put(`/account/updateDetailInfo`, data);
  return response.data;
};

export const updateDescription = async (data) => {
  const response = await SpringServer.put(`/account/updateDescription`, data);
  return response.data;
};

export const updateAvatar = async (avatar) => {
  formData = new FormData();
  console.log(avatar)
  if (avatar != null) {
    formData.append("avatar", {
      name: `image.jpg`,
      type: "image/jpeg",
      uri: avatar,
    });
  }
  await SpringServer.put("/account/updateAvatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCoverImage = async (coverImage) => {
  formData = new FormData();
  console.log(coverImage)
  if (coverImage != null) {
    formData.append("coverImage", {
      name: `image.jpg`,
      type: "image/jpeg",
      uri: coverImage,
    });
  }
  await SpringServer.put("/account/updateCoverImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
