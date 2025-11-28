import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import FeedItem from "@/components/FeedItem";
import Loading from "@/components/Loading";
import {
  selectCommentsByPostId,
  selectCommentsLoading,
} from "@/features/comments";
import { fetchComments, getPostById } from "@/services/Posts";
import ReplyComposer from "@/components/ReplyComposer";

const ContentDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { postId } = useParams();

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId),
  );
  const commentsLoading = useSelector((state) =>
    selectCommentsLoading(state, postId),
  );

  useEffect(() => {
    let isMounted = true;

    const loadPageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postData] = await Promise.all([
          getPostById(postId),
          dispatch(fetchComments(postId)).unwrap(),
        ]);

        if (isMounted) {
          setPost(postData);
        }
      } catch (err) {
        console.error("Failed to load page data:", err);
        if (isMounted) {
          setError(err.message || "Có lỗi xảy ra");
          toast.error("Không thể tải bài viết");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [postId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loading size="w-6 h-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-red-500">Có lỗi xảy ra: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-500"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Không tìm thấy bài viết</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Post detail */}
      <div className="ps-6 pe-6">
        <FeedItem post={post} />
        <div className="mt-3 flex h-14 items-center justify-between border-t text-sm">
          <div className="font-bold">Mới đây</div>
          <div className="text-gray-400">Xem hoạt động</div>
        </div>
      </div>

      {/* Comments section */}
      <div className="flex flex-col gap-2">
        {commentsLoading[postId] ? (
          <div className="flex justify-center py-4">
            <Loading size="w-5 h-5" />
          </div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center text-sm font-semibold text-gray-500 italic">
            Chưa có bình luận nào
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-t border-gray-300 ps-6 pe-6 pt-3"
            >
              <FeedItem post={comment} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentDetailPage;
