import { useEffect, useRef } from "react";
import PostHeader from "../components/PostHeader";
import { ChevronRight, X } from "lucide-react";
import CommentActionToolbar from "@/components/comments/CommentActionToolbar";
import { Button } from "@/components/ui/button";

const PostComposer = ({
  user,
  content,
  onChange,
  onFocus,
  disabled,
  placeholder,
  showRemoveButton,
  onRemoveThread,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (onFocus) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [onFocus]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <>
      <div className="flex items-center">
        <PostHeader user={user} hideDate showMenu={false} />
        <div className="flex items-center gap-1 placeholder:text-gray-500 dark:placeholder:text-gray-400">
          <ChevronRight
            className="text-gray-500 dark:text-gray-400"
            size={15}
          />
          <input
            type="text"
            placeholder="thêm chủ đề"
            className="border-none bg-transparent text-gray-900 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        {showRemoveButton && (
          <Button
            variant={"outline"}
            className={"ml-auto border-none bg-transparent shadow-none"}
            onClick={onRemoveThread}
          >
            <X color="white" />
          </Button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        className="w-full resize-none border-none bg-transparent p-0 text-gray-900 shadow-none outline-none placeholder:text-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
        placeholder={placeholder}
        value={content}
        onChange={onChange}
        disabled={disabled}
        autoFocus
        rows={1}
      />
      <CommentActionToolbar />
    </>
  );
};

export default PostComposer;
