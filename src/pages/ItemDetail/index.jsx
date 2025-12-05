import { useLocation, useParams } from "react-router";

import { useFetchPostDetail } from "@/features/posts";
import FeedItem from "@/components/FeedItem";
import Loading from "@/components/Loading";
import ThreadLine from "@/components/ThreadLine";
import CommentSection from "./components/CommentSection";
import ActivityHeader from "@/components/ActivityHeader";

const ItemDetailPage = () => {
  const location = useLocation();
  const parentId = location.state?.parentId;
  const { postId } = useParams();

  const [currentItem, currentPostLoading] = useFetchPostDetail(postId);
  const [parentItem, parentPostLoading] = useFetchPostDetail(parentId);

  if (currentPostLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loading size="w-6 h-6" />
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="flex justify-center py-10">
        <p className="t text-gray-500">Không tìm thấy bài viết</p>
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
              <div className="py-4 text-center text-sm font-bold text-gray-500">
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
