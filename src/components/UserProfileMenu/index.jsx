import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";

const UserProfileMenu = ({ children, delay = 500 }) => {
  return (
    <NavigationMenu delayDuration={delay}>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          showChevronDown={false}
          className="text-md cursor-pointer p-0! hover:underline"
        >
          {children}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="w-80! p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">Leminhquan</span>
              <span>leminhquan022_</span>
            </div>
            <UserAvatar
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
              imgSize="h-14 w-14"
            />
          </div>
          <div className="mt-3">
            <p className="text-foreground mb-2 text-sm font-semibold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
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
