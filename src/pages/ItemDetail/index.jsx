import { useLocation, useParams } from "react-router";

import { selectItemById, selectLoadingById } from "@/features/posts";
import FeedItem from "@/components/FeedItem";
import Loading from "@/components/Loading";
import ThreadLine from "@/components/ThreadLine";
import CommentSection from "./components/CommentSection";
import ActivityHeader from "@/components/ActivityHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById } from "@/services/Posts";

const ItemDetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const parentId = location.state?.parentId;
  const { postId } = useParams();

  const parentItem = useSelector((state) => selectItemById(state, parentId));
  const parentPostLoading = useSelector((state) =>
    selectLoadingById(state, parentId),
  );
  const currentItem = useSelector((state) => selectItemById(state, postId));
  const currentItemLoading = useSelector((state) =>
    selectLoadingById(state, postId),
  );

  useEffect(() => {
    if (!currentItem && !currentItemLoading) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, currentItem, currentItemLoading, dispatch]);

  useEffect(() => {
    if (parentId && !parentItem && !parentPostLoading) {
      dispatch(fetchPostById(parentId));
    }
  }, [parentId, parentItem, parentPostLoading, dispatch]);

  if (currentItemLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loading size="w-6 h-6" />
      </div>
    );
  }

  if (!currentItem && !currentItemLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500 dark:text-gray-400">
          Không tìm thấy bài viết
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Post detail */}
      <div className="ps-6 pe-6">
        {parentId ? (
          <div>
            {parentPostLoading ? (
              <div className="flex justify-center py-4">
                <Loading size="w-5 h-5" />
              </div>
            ) : parentItem ? (
              <>
                <div className="relative">
                  <ThreadLine show />
                  <FeedItem post={parentItem} disableNavigation />
                </div>
                <div className="mt-3">
                  <FeedItem post={currentItem} disableNavigation />
                </div>
              </>
            ) : (
              <div className="py-4 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                Không thể tải bài viết gốc
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <FeedItem post={currentItem} disableNavigation />
          </div>
        )}

        <ActivityHeader showActivity={currentItem.replies_count} />
      </div>
      {/* Comments section */}
      <CommentSection postId={postId} />
    </div>
  );
};

export default ItemDetailPage;
