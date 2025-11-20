import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const formatTime = (time) => {
  const relativeTime = dayjs(time).fromNow();
  return relativeTime;
};
