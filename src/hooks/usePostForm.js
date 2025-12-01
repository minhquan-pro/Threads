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
          type: "default",
          isLoading: false,
          autoClose: 1000,
          theme: "dark",
        }));
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
