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
    return toastify(message, {
      ...defaultConfig,
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
      ...options,
    });
  },
};
