import { http } from "@/utils";

export const likePost = async (postId) => {
  try {
    const response = await http.post(`/posts/${postId}/like`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const repostPost = async (postId) => {
  try {
    const response = await http.post(`/posts/${postId}/repost`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const quotePost = async (postId, data) => {
  try {
    const response = await http.post(`posts/${postId}/quote`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const savePost = async (postId) => {
  try {
    const response = await http.post(`posts/${postId}/save`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
