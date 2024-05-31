import SpringServer from "../api/SpringServer";

export const getNotificationByAccount = async(account_id) => {
    const response = await SpringServer.get(
        `/facebook.api/notifications/${account_id}`
    );
    return response.data;
}

export const createNotification = async({from_account_id, to_account_id, to_post_id, to_comment_post_id, notify_type}) => {
    const formData = new FormData();
    formData.append("from_account_id", from_account_id)
    formData.append("to_account_id", to_account_id)
    if(to_post_id != null) formData.append("to_post_id", to_post_id)
    if(to_comment_post_id != null) formData.append("to_comment_post_id", to_comment_post_id)
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