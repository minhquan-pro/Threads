import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ToastSuccess } from "@/components/common/ToastSuccess";

export const usePostForm = (
  submitFunction,
  options = {
    successMessage: "Đã đăng",
    errorMessage: "Đăng thất bại",
    onSuccessView: null,
    viewLabel: "Xem",
  },
) => {
  const { successMessage, errorMessage, onSuccessView, viewLabel } = options;
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const isDark = document.documentElement.classList.contains("dark");
  const [threads, setThreads] = useState([
    { id: uuidv4(), content: "", showButton: false },
  ]);

  const firstThreadContent = threads[0]?.content || "";
  const hasContent = threads.some((thread) => thread.content.trim());

  const handleThreadContentChange = (id, content) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, content } : thread,
      ),
    );
  };

  const handleAddThread = () => {
    setThreads((prevThreads) => [
      ...prevThreads,
      { id: uuidv4(), content: "", showButton: true },
    ]);
  };

  const handleRemoveThread = (id) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== id),
    );
  };

  const resetThreads = () => {
    setThreads([{ id: uuidv4(), content: "", showButton: false }]);
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
      const result = await submitFunction({ content: firstThreadContent });
      setLastResult(result);

      const handleView = onSuccessView ? () => onSuccessView(result) : null;

      toast.update(toastId, {
        render: (
          <ToastSuccess
            message={successMessage}
            onView={handleView}
            viewLabel={viewLabel}
          />
        ),
        type: "default",
        isLoading: false,
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: true,
      });

      resetThreads();
      return result;
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
    lastResult,
    threads,
    firstThreadContent,
    hasContent,
    handleSubmit,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
    resetThreads,
  };
};
