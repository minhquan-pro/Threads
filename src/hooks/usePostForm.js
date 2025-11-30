import { useState } from "react";
import { toast } from "react-toastify";

export const usePostForm = (submitFunction, options = {}) => {
  const { successMessage, errorMessage } = options;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    const toastId = toast.loading("Đang đăng", {
      position: "bottom-center",
      theme: "dark",
    });

    try {
      (await submitFunction({
        content,
      }),
        toast.update(toastId, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 1000,
          theme: "dark",
        }));
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, content, handleChangeContent, resetContent, handleSubmit };
};
