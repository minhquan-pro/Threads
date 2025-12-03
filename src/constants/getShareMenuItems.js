import { Link, Images, Braces } from "lucide-react";

export const getShareMenuItems = (handlers) => {
  return [
    {
      id: "copy-link",
      label: "Sao chép liên kết",
      Icon: Link,
      onClick: handlers.onCopyLink,
    },
    {
      id: "copy-image",
      label: "Sao chép dưới dạng hình",
      Icon: Images,
      onClick: handlers.onCopyImage,
    },
    {
      id: "embed",
      label: "Lấy mã nhúng",
      Icon: Braces,
      onClick: handlers.onEmbed,
    },
  ];
};
