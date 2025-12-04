/* eslint-disable no-unused-vars */
import { Images, MapPin, Smile, Vote, ImagePlay } from "lucide-react";

const ICONS = [
  {
    id: "image",
    Icon: Images,
    label: "Đính kèm file phương tiện",
  },
  {
    id: "GIF",
    Icon: ImagePlay,
    label: "Thêm file GIF",
  },
  {
    id: "smile",
    Icon: Smile,
    label: "Thêm biểu tượng cảm xúc",
  },
  {
    id: "vote",
    Icon: Vote,
    label: "Thêm cuộc tham dò ý kiến",
  },
  {
    id: "location",
    Icon: MapPin,
    label: "Thêm vị trí",
  },
];

const CommentActionToolbar = () => {
  return (
    <div className="mt-3 flex items-center gap-3">
      {ICONS.map(({ id, Icon, label }) => {
        return (
          <button
            key={id}
            className={`group relative flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-all duration-200 hover:scale-105 hover:bg-gray-100`}
            aria-label={label}
          >
            <Icon color="gray" size={20} strokeWidth={1.5} />

            <span className="pointer-events-none absolute -bottom-6 left-11 z-50 -translate-x-1/2 rounded bg-gray-800 p-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CommentActionToolbar;
