import { http } from "@/utils";

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
