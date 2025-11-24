import classNames from "classnames";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ imgSize, className, src, Icon }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-full shadow hover:scale-100">
        <Avatar className={classNames(imgSize, className)}>
          <AvatarImage src={src} />
        </Avatar>
      </div>
      {Icon && (
        <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-black hover:scale-125">
          <Icon size={8} strokeWidth={2} color="white" />
        </div>
      )}
    </div>
  );
};
export default UserAvatar;
