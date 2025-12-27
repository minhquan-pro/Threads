import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostById } from "@/services/Posts";
import { selectItemById, selectLoadingById } from "@/features/posts";
import FeedItem from "@/components/Posts/FeedItem";
import Loading from "@/components/common/Loading";
import ThreadLine from "@/components/common/ThreadLine";
import CommentSection from "./components/CommentSection";
import ActivityHeader from "@/components/navigation/ActivityHeader";

const ItemDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [parentChain, setParentChain] = useState([]);
  const [loadingParents, setLoadingParents] = useState(false);
  const currentItem = useSelector((state) => selectItemById(state, postId));
  const currentItemLoading = useSelector((state) =>
    selectLoadingById(state, postId),
  );
  const allPosts = useSelector((state) => state.posts.byId);

  // Fetch current post
  useEffect(() => {
    if (!currentItem && !currentItemLoading) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, currentItem, currentItemLoading, dispatch]);

  useEffect(() => {
    if (loadingParents) return;

    const fetchParentChain = async () => {
      if (!currentItem?.parent_id) {
        setParentChain([]);
        return;
      }

      setLoadingParents(true);
      const chain = [];
      let currentParentId = currentItem.parent_id;

      try {
        while (currentParentId) {
          if (!allPosts[currentParentId]) {
            await dispatch(fetchPostById(currentParentId)).unwrap();
          }

          const parentPost = allPosts[currentParentId];

          if (parentPost) {
            chain.unshift(parentPost);
            currentParentId = parentPost.parent_id;
          } else {
            break;
          }
        }
        setParentChain(chain);
      } catch (error) {
        console.error("Error fetching parent chain:", error);
      } finally {
        setLoadingParents(false);
      }
    };

    fetchParentChain();
  }, [currentItem?.parent_id, dispatch, allPosts, loadingParents]);

  // Handle deleted post
  useEffect(() => {
    if (currentItem?._deleted) {
      navigate("/", { replace: true });
    }
  }, [currentItem?._deleted, navigate]);

  // Update document title
  useEffect(() => {
    if (currentItem?.content) {
      document.title = currentItem.content;
    }

    return () => {
      document.title = "Threads";
    };
  }, [currentItem?.content]);

  // Loading state
  if (currentItemLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loading size="w-6 h-6" />
      </div>
    );
  }

  // Post not found
  if (!currentItem && !currentItemLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500 dark:text-gray-400">
          Không tìm thấy bài viết
        </p>
      </div>
    );
  }

  // Don't render anything if deleted
  if (currentItem?._deleted) {
    return null;
  }

  return (
    <div className="custom-scrollbar min-h-screen pt-18">
      {/* Post detail */}
      <div className="ps-6 pe-6">
        {currentItem?.parent_id ? (
          <div>
            {loadingParents ? (
              <div className="flex justify-center py-4">
                <Loading size="w-5 h-5" />
              </div>
            ) : (
              <>
                {parentChain.map((parent) => (
                  <div key={parent.id} className="relative">
                    <ThreadLine show />
                    <FeedItem post={parent} disableNavigation />
                  </div>
                ))}
                <div className="mt-3">
                  <FeedItem post={currentItem} disableNavigation />
                </div>
              </>
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
