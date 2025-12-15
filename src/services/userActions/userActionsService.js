import http from "@/utils/http";

export const blockUser = async (userId) => {
  try {
    const response = await http.post(`/users/${userId}/block`);
    return response.success;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const unBlockUser = async (userId) => {
  try {
    const response = await http.post(`/users/${userId}/block`, {
      _method: "DELETE",
    });
    return response.success;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const muteUser = async (userId) => {
  try {
    const response = await http.post(`/users/${userId}/mute`);
    return response.success;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const unmuteUser = async (userId) => {
  try {
    const response = await http.post(`/users/${userId}/mute`, {
      _method: "DELETE",
    });
    return response.success;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const restrictUser = async (userId) => {
  try {
    const response = await http.post(`/users/${userId}/restrict`);
    return response.success;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
