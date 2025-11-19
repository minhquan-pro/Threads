import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;
export const httpClient = axios.create({
  baseURL,
});

const _send = async (url, method, data, config) => {
  const response = await httpClient.request({
    ...config,
    url,
    method,
    data,
  });

  return response.data;
};

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const result = await axios.post(`${baseURL}refresh-token`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", result.data.accessToken);
    processQueue(null);
  } catch (error) {
    processQueue(error);
    throw error;
  }
};

const getNewToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    await refreshToken();
    isRefreshing = false;
    return;
  }

  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 400 && error.response.data) {
      return Promise.reject(error);
    }
    const shouldRenewToken =
      error.response?.status === 401 && !originalRequest._retry;
    if (shouldRenewToken) {
      originalRequest._retry = true;
      try {
        await getNewToken();
        return httpClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

const get = async (url, config) => {
  return await _send(url, "GET", null, config);
};

const post = async (url, data, config) => {
  return await _send(url, "POST", data, config);
};

const put = async (url, data, config) => {
  return await _send(url, "PUT", data, config);
};

const patch = async (url, data, config) => {
  return await _send(url, "GET", data, config);
};

const del = async (url, config) => {
  return await _send(url, "DELETE", null, config);
};

export const http = { get, post, put, patch, del };
