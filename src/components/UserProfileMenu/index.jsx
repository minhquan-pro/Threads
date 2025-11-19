// ...existing code...
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";

const UserProfileMenu = ({ children, user, delay = 500 }) => {
  return (
    /* ensure parent allows overflow so the content can appear above other elements */
    <NavigationMenu delayDuration={delay} className="absolute overflow-visible">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          showChevronDown={false}
          className="text-md relative z-10 cursor-pointer p-0! hover:underline"
        >
          {children}
        </NavigationMenuTrigger>
        {/* raise content above trigger and others */}
        <NavigationMenuContent className="z-[9999] w-80! p-5">
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
