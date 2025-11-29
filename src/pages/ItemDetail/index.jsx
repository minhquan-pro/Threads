import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";

import FeedItem from "@/components/FeedItem";
import Loading from "@/components/Loading";

import { getPostById } from "@/services/Posts";
import { Button } from "@/components/ui/button";
import ThreadLine from "@/components/ThreadLine";
import CommentSection from "@/components/CommentSection";

const ItemDetailPage = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [parentItem, setParentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parentLoading, setParentLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const { postId } = useParams();
  const parentId = location.state?.parentId;

  // Get Parent Post
  useEffect(() => {
    if (!parentId) return;

    let isMounted = true;

    const loadParentPost = async () => {
      setParentLoading(true);
      try {
        const response = await getPostById(parentId);
        if (isMounted) {
          setParentItem(response);
        }
      } catch (err) {
        console.error("Failed to load parent post:", err);
        if (isMounted) {
          toast.error("Không thể tải bài viết gốc");
        }
      } finally {
        if (isMounted) {
          setParentLoading(false);
        }
      }
    };

    loadParentPost();

    return () => {
      isMounted = false;
    };
  }, [parentId]);

  // Get Main Post and Comments
  useEffect(() => {
    let isMounted = true;

    const loadPageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postData] = await Promise.all([getPostById(postId)]);

        if (isMounted) {
          setCurrentItem(postData);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load page data:", err);
          setError(err.message || "Có lỗi xảy ra");
          toast.error("Không thể tải bài viết");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
        setLoading(false);
      }
    };

    loadPageData();
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
        <p className="font-semibold text-red-500 italic">
          Có lỗi xảy ra: {error}
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  if (!currentItem) {
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
        {parentId ? (
          <div>
            {parentLoading ? (
              <div className="flex justify-center py-4">
                <Loading size="w-5 h-5" />
              </div>
            ) : parentItem ? (
              <>
                <div className="relative">
                  <ThreadLine show />
                  <FeedItem post={parentItem} />
                </div>
                <div className="mt-3">
                  <FeedItem post={currentItem} />
                </div>
              </>
            ) : (
              <div className="py-4 text-center text-sm text-gray-500">
                Không thể tải bài viết gốc
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <FeedItem post={currentItem} />
          </div>
        )}

        <div className="mt-3 flex h-14 items-center justify-between border-t border-gray-300 text-sm">
          <div className="font-bold">Mới đây</div>
          <div className="text-gray-400">Xem hoạt động</div>
        </div>
      </div>

      {/* Comments section */}
      <CommentSection postId={postId} />
    </div>
  );
};

export default ItemDetailPage;
