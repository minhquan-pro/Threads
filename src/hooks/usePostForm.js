import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const usePostForm = (
  submitFunction,
  options = { successMessage: "Đã đăng", errorMessage: "Đăng thất bại" },
) => {
  const { successMessage, errorMessage } = options;
  const [loading, setLoading] = useState(false);
  const isDark = document.documentElement.classList.contains("dark");
  const [contentTest, setContentTest] = useState("");
  const [threads, setThreads] = useState([
    { id: uuidv4(), content: "", showButton: false },
  ]);

  const handleThreadContentChange = (id, content) => {
    setThreads(
      threads.map((thread) =>
        thread.id === id ? { ...thread, content } : thread,
      ),
    );
    setContentTest(content);
  };

  const handleAddThread = () => {
    setThreads((prevState) => [
      ...prevState,
      { id: uuidv4(), content: "", showButton: true },
    ]);
  };

  const handleRemoveThread = (id) => {
    setThreads(threads.filter((thread) => thread.id !== id));
    setContentTest("");
  };

  const resetThreads = () => {
    setThreads([{ id: uuidv4(), content: "" }]);
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
      await submitFunction({ content: contentTest });

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

  return {
    loading,
    contentTest,
    handleSubmit,
    threads,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
    resetThreads,
  };
};
