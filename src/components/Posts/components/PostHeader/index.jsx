/* eslint-disable no-unused-vars */
import { formatTime } from "@/utils/formatTime";
import verifiedIcon from "@/assets/icons/verifiedIcon.png";
import {
  BellOff,
  ChevronRight,
  Ellipsis,
  EyeOff,
  Icon,
  Link,
  LockKeyhole,
  MessageSquareWarning,
  Save,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const POST_HEADER_MENU_ITEMS = [
  { label: "Thêm vào bảng feed", type: "item", Icon: ChevronRight },
  { type: "separator" },
  { label: "Lưu", type: "item", Icon: Save },
  { label: "Không quan tâm", type: "item", Icon: EyeOff },
  { type: "separator" },
  { label: "Tắt thông báo", type: "item", Icon: BellOff },
  { label: "Hạn chế", type: "item", Icon: Shield },
  { label: "Chặn", type: "item", Icon: LockKeyhole, danger: true },
  { label: "Báo cáo", type: "item", Icon: MessageSquareWarning, danger: true },
  { type: "separator" },
  { label: "Sao chép liên kết", type: "item", Icon: Link },
];

const PostHeader = ({ user, hideDate = false, createdAt, showStats }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5">
          <span className="text-md font-semibold">{user.username}</span>
          {user.verified && <img src={verifiedIcon} className="h-4 w-4" />}
        </div>
        {!hideDate && showStats && (
          <span className="text-sm text-gray-500">{formatTime(createdAt)}</span>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.stopPropagation()}
          className="rounded-full border-none p-1 outline-none hover:bg-gray-100"
        >
          <Ellipsis size={16} color="gray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border border-gray-200 outline-none"
        >
          {POST_HEADER_MENU_ITEMS.map(
            ({ label, type, Icon, danger }, index) => {
              if (type === "separator") {
                return <DropdownMenuSeparator key={`separator-${index}`} />;
              }
              return (
                <DropdownMenuItem
                  key={label}
                  onClick={(e) => e.stopPropagation()}
                  className={`text-md flex min-w-60 cursor-pointer items-center justify-between p-3 font-semibold ${danger && "text-red-500"}`}
                >
                  {label}
                  <Icon size={18} />
                </DropdownMenuItem>
              );
            },
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default PostHeader;
