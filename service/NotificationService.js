import SpringServer from "../api/SpringServer";

export const getNotificationByAccount = async(account_id) => {
    const response = await SpringServer.get(
        `/facebook.api/notifications/${account_id}`
    );
    return response.data;
}

export const getSendNotificationFromFriendRequest = async(receiverId) => {
  const response = await SpringServer.get(
    `/facebook.api/notifications/getSendNotification/${receiverId}`
  );
  return response.data;
}

export const getReceiveNotificationFromFriendRequest = async(senderId) => {
  const response = await SpringServer.get(
    `/facebook.api/notifications/getReceiveNotification/${senderId}`
  );
  return response.data;
}

export const createNotification = async({from_account_id, to_account_id, to_post_id, to_comment_post_id, send_comment_id, notify_type}) => {
    const formData = new FormData();
    formData.append("from_account_id", from_account_id)
    formData.append("to_account_id", to_account_id)
    if(to_post_id != null) formData.append("to_post_id", to_post_id)
    if(to_comment_post_id != null) formData.append("to_comment_post_id", to_comment_post_id)
    if(send_comment_id != null) formData.append("send_comment_id", send_comment_id)
    formData.append("notify_type", notify_type)

    const response = await SpringServer.post(
        "/facebook.api/notifications/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    return response.data;
}

export const updateNotification = async(id_notify) => {
    const response = await SpringServer.patch(
        `/facebook.api/notifications/update/${id_notify}`
    );
    return response.data;
}

export const deleteNotification = async(id_notify) => {
    const response = await SpringServer.delete(
      `/facebook.api/notifications/delete/${id_notify}`
    );
  return response.data;
}