import http from "@/utils/http";

export const getUserRepostPost = async (userId) => {
  try {
    const response = await http.get(`/users/${userId}/reposts`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
