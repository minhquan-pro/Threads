import { useEffect, useRef } from "react";
import PostHeader from "../Posts/components/PostHeader";
import CommentActionToolbar from "../CommentActionToolbar";

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
    <div className="w-full">
      <PostHeader user={user} hideDate showMenu={false} />
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
    </div>
  );
};

export default PostComposer;
