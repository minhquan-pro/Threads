import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = ({ count = 10 }) => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="flex min-h-screen flex-col">
      <SkeletonTheme
        baseColor={isDark ? "#3a3a3a" : "#e8e8e8"}
        highlightColor={isDark ? "#4a4a4a" : "#f0f0f0"}
      >
        {[...Array(count)].map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex gap-3">
              <Skeleton circle width={40} height={40} />
              <div className="flex-1">
                <Skeleton width={150} height={16} className="mb-2" />
                <Skeleton className="mb-2" />
                <Skeleton width={250} className="mb-2" />
              </div>
            </div>
          </div>
        ))}
      </SkeletonTheme>
    </div>
  );
};

export default PostSkeleton;
