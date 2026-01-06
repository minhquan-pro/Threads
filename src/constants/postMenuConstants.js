import {
  BellOff,
  BookUser,
  ChevronRight,
  EyeOff,
  HeartOff,
  Link,
  LockKeyhole,
  MessageSquareWarning,
  Save,
  Shield,
  Trash,
} from "lucide-react";

export const POST_HEADER_MENU_ITEMS = [
  { label: "Thêm vào bảng feed", action: "addToFeed", Icon: ChevronRight },
  { type: "separator" },
  { label: "Lưu", action: "save", Icon: Save },
  { label: "Không quan tâm", action: "hide", Icon: EyeOff },
  { type: "separator" },
  { label: "Tắt thông báo", action: "mute", Icon: BellOff },
  { label: "Hạn chế", action: "restrict", Icon: Shield },
  { label: "Chặn", action: "block", Icon: LockKeyhole, danger: true },
  {
    label: "Báo cáo",
    action: "report",
    Icon: MessageSquareWarning,
    danger: true,
  },
  { type: "separator" },
  { label: "Sao chép liên kết", action: "copyLink", Icon: Link },
];

export const POST_HEADER_USER_MENU_ITEMS = [
  { label: "Thông tin chi tiết", action: "details", Icon: BookUser },
  { type: "separator" },
  { label: "Chỉnh sửa", action: "fix" },
  { type: "separator" },
  { label: "Lưu", action: "save", Icon: Save },
  {
    label: "Ẩn số lượt thích và lượt chia sẻ",
    action: "hideStats",
    Icon: HeartOff,
  },
  {
    label: "Các lựa chọn để kiểm soát",
    action: "controls",
    Icon: ChevronRight,
  },
  { label: "Xóa", action: "delete", Icon: Trash, danger: true },
  { type: "separator" },
  { label: "Sao chép liên kết", action: "copyLink", Icon: Link },
];

export const GUEST_MENU_ITEMS = [
  { label: "Sao chép liên kết", action: "copyLink", Icon: Link },
];
