import classNames from "classnames";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ imgSize, className, src, Icon }) => {
  return (
    <div className="relative cursor-pointer overflow-hidden">
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
        <Icon
          size={14}
          color="white"
          className="absolute right-0 bottom-0 rounded-full bg-black p-0.5 hover:scale-125"
        />
      )}
    </div>
  );
};
export default UserAvatar;
