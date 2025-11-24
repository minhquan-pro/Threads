import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/features/auth";
import defaultImageUser from "@/assets/images/defaultImageUser.png";

const UserAvatar = ({ username, userId, imgSize, className, src, Icon }) => {
  const currentUser = useCurrentUser();
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-full shadow hover:scale-100">
        <Avatar className={classNames(imgSize, className)}>
          <AvatarImage
            src={src || defaultImageUser}
            alt={username || "User avatar"}
          />
        </Avatar>
      </div>
      {Icon && currentUser.id !== userId && (
        <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-black hover:scale-125">
          <Icon size={10} strokeWidth={3} color="white" />
        </div>
      )}
    </div>
  );
};
export default UserAvatar;
