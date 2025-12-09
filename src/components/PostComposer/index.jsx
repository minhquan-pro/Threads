import { useEffect, useRef } from "react";
import PostHeader from "../Posts/components/PostHeader";
import CommentActionToolbar from "../CommentActionToolbar";
import { ChevronRight } from "lucide-react";

const PostComposer = ({
  user,
  content,
  onChange,
  onFocus,
  disabled,
  placeholder,
  autoFocus,
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
        <div className="flex items-center gap-1 placeholder:text-gray-500">
          <ChevronRight color="gray" size={15} />
          <input
            type="text"
            placeholder="thêm chủ đề"
            className="border-none outline-none"
          />
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className="w-full resize-none border-none p-0 shadow-none outline-none placeholder:text-gray-600"
        placeholder={placeholder}
        value={content}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
        rows={1}
      />
      <CommentActionToolbar />
    </>
  );
};

export default PostComposer;
