import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";

const UserProfileMenu = ({ children, user, delay = 500 }) => {
  return (
    <NavigationMenu delayDuration={delay} className="absolute overflow-visible">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          showChevronDown={false}
          className="text-md relative z-10 cursor-pointer p-0! hover:underline"
        >
          {children}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="z-50 w-80! p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{user.name}</span>
              <span>{user.username}</span>
            </div>
            <UserAvatar src={user.avatar_url} imgSize="h-14 w-14" />
          </div>
          <div className="mt-3">
            <p className="text-foreground mb-2 text-sm font-semibold">
              {user.bio}
            </p>
            <span className="text-sm text-gray-500">23 người theo dõi</span>
          </div>
          <AuthRequiredDialog
            type="button"
            title="Đăng ký để theo dõi"
            description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
            buttonClasses="w-full mt-3 bg-foreground text-button-foreground"
          >
            Theo dõi
          </AuthRequiredDialog>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default UserProfileMenu;
// ...existing code...
