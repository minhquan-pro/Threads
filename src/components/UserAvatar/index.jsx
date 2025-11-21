import classNames from "classnames";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ imgSize, className, src, Icon }) => {
  return (
    <div className="relative overflow-hidden">
      <Avatar
        className={classNames(
          imgSize,
          className,
          "border-2 border-gray-300 bg-white shadow hover:scale-100",
        )}
      >
        <AvatarImage src={src} />
      </Avatar>
      {Icon && (
        <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-black hover:scale-125">
          <Icon size={8} strokeWidth={2} color="white" />
        </div>
      )}
    </div>
  );
};
export default UserAvatar;
