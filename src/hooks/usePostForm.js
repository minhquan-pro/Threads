import { useState } from "react";
import { toast } from "react-toastify";

export const usePostForm = (
  submitFunction,
  options = { successMessage: "Đã đăng", errorMessage: "Đăng thất bại" },
) => {
  const { successMessage, errorMessage } = options;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const isDark = document.documentElement.classList.contains("dark");

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    const toastId = toast.loading("Đang đăng...", {
      position: "bottom-center",
      style: {
        background: isDark ? "#ffffff" : "black",
        color: isDark ? "#000000" : "#ffffff",
      },
      theme: "dark",
    });

    try {
      await submitFunction({ content });

      toast.update(toastId, {
        render: successMessage,
        type: "default",
        isLoading: false,
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: true,
      });
      return true;
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        theme: "colored",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, content, handleChangeContent, resetContent, handleSubmit };
};
