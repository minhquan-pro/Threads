import { useParams } from "react-router";
import FeedItem from "@/components/FeedItem";
import { useFetchPostDetail } from "@/features/posts";

const Embed = () => {
  const { postId } = useParams();
  const [post, loading] = useFetchPostDetail(postId);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Đang tải...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Không tìm thấy bài viết</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full">
        <FeedItem post={post} hideInteraction />
      </div>
    </div>
  );
};

export default Embed;
