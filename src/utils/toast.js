import { toast as toastify } from "react-toastify";

const defaultConfig = {
  autoClose: 1000,
  position: "bottom-center",
  theme: "dark",
  closeButton: false,
  style: {
    width: "fit-content",
    minWidth: "auto",
  },
  hideProgressBar: true,
};

export const toast = {
  default: (message, options = {}) => {
    const isDark = document.documentElement.classList.contains("dark");

    return toastify(message, {
      ...defaultConfig,
      style: {
        ...defaultConfig.style,
        background: isDark ? "#ffffff" : "black",
        color: isDark ? "#000000" : "#ffffff",
      },
      ...options,
    });
  },
  success: (message, options = {}) => {
    return toastify.success(message, {
      ...defaultConfig,
      ...options,
    });
  },
  error: (message, options = {}) => {
    return toastify.error(message, {
      ...defaultConfig,
      theme: "colored",
      ...options,
    });
  },
};
