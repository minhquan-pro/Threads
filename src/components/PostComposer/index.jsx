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
  const inputRef = useRef(null);

  useEffect(() => {
    if (onFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [onFocus]);

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
      <input
        ref={inputRef}
        className="w-full border-none p-0 shadow-none outline-none placeholder:text-gray-600"
        placeholder={placeholder}
        value={content}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <CommentActionToolbar />
    </>
  );
};

export default PostComposer;
