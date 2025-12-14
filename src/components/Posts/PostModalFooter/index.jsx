import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostModalFooter = ({
  contentLength,
  maxLength,
  isSubmitDisabled,
  onSubmit,
  loading,
}) => {
  return (
    <div className="sticky right-0 bottom-0 left-0 mt-3 flex items-center justify-between bg-white px-6 py-3 shadow-sm dark:bg-[#181818]">
      <Button
        variant="ghost"
        className="mr-auto gap-2 border-none p-0 text-gray-500 hover:bg-transparent hover:opacity-70 dark:text-gray-400 dark:hover:text-gray-300"
        aria-label="Các lựa chọn để kiểm soát câu trả lời"
      >
        <div className="rounded-sm border-2 p-0.5 dark:border-gray-800">
          <ArrowUpDown size={20} />
        </div>
        <span className="hidden sm:inline">
          Các lựa chọn để kiểm soát câu trả lời
        </span>
      </Button>

      <div className="flex items-center gap-3">
        <span
          className={`text-sm ${contentLength > maxLength ? "text-sm font-medium text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          {contentLength}/{maxLength}
        </span>
        <Button
          disabled={isSubmitDisabled}
          onClick={onSubmit}
          className="min-w-20"
        >
          {loading ? "Đang đăng..." : "Đăng"}
        </Button>
      </div>
    </div>
  );
};

export default PostModalFooter;
