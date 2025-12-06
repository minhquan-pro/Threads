import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import classNames from "classnames";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const FEED_OPTIONS = [
  { id: "", label: "Dành cho bạn" },
  { id: "following", label: "Đang theo dõi" },
  { id: "ghost-posts", label: "Bài viết tự hủy" },
];

const FeedSubmenu = ({ handleBack }) => {
  return (
    <div>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          handleBack();
        }}
        className="flex items-center gap-2 font-medium"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="w-full text-center text-lg font-bold">Bảng Feed</span>
      </DropdownMenuItem>
      <div>
        {FEED_OPTIONS.map((feed) => {
          return (
            <Link key={feed.id} to={`/${feed.id}`}>
              <DropdownMenuItem
                className={classNames(`w-full px-4 py-3 font-semibold`)}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                {feed.label}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default FeedSubmenu;
