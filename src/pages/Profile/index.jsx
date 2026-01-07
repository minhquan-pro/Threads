import { useParams } from "react-router";
import { useEffect } from "react";
import { Bell, Ellipsis, Fence, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/users/UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import FollowerPreview from "@/components/users/FollowerPreview";

const Profile = () => {
  const { userId } = useParams();
  const currentUser = useCurrentUser();
  const isProfileCurrentUser = userId === "profile";

  const displayUser = isProfileCurrentUser
    ? currentUser
    : {
        name: "Người dùng demo",
        username: "@user_demo",
        bio: "Đây là trang cá nhân demo của người dùng khác",
        followers: 1234,
      };

  useEffect(() => {
    document.title = `${displayUser.name} (${displayUser.username}) · Threads`;
    return () => {
      document.title = "Threads";
    };
  }, [displayUser.name, displayUser.username]);

  return (
    <div className="pt-16 pb-24 md:pt-10 md:pb-6">
      <div className="px-4 py-6 md:px-6 dark:text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold md:text-3xl">{displayUser.name}</p>
            <span className="text-sm text-gray-600 md:text-base dark:text-gray-400">
              {displayUser.username}
            </span>
          </div>
          <UserAvatar imgSize="w-20 h-20" />
        </div>

        <p className="mt-6 mb-1 text-sm md:text-base">
          {displayUser.bio || "Chưa có tiểu sử"}
        </p>

        <div className="flex items-center justify-between">
          <div className="cursor-pointer text-sm text-gray-600 hover:opacity-90 dark:text-gray-400">
            <FollowerPreview followerCount={100} />
          </div>

          {isProfileCurrentUser ? (
            <Button className={"border-none shadow-none"} variant={"outline"}>
              <Fence />
            </Button>
          ) : (
            <div className="flex items-center gap-5">
              <button className="transition hover:opacity-70">
                <Instagram size={25} />
              </button>
              <button className="transition hover:opacity-70">
                <Bell size={25} />
              </button>
              <button className="transition hover:opacity-70">
                <Ellipsis size={25} />
              </button>
            </div>
          )}
        </div>

        {isProfileCurrentUser ? (
          <Button
            className={"mt-6 w-full border-gray-300 text-sm md:text-base"}
            variant={"outline"}
          >
            Chỉnh sửa trang cá nhân
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              className={"mt-6 flex-1 border-gray-300 text-sm md:text-base"}
              variant={"outline"}
            >
              Theo dõi
            </Button>
            <Button
              className={"mt-6 flex-1 border-gray-300 text-sm md:text-base"}
              variant={"outline"}
            >
              Nhắc đến
            </Button>
          </div>
        )}
      </div>

      <Tabs
        defaultValue={"thread"}
        className="mt-4 border-gray-300 pb-4 md:pb-5"
      >
        <TabsList className="w-full justify-between border-b border-gray-300 bg-transparent px-3 pb-3 md:px-6 md:pb-6 dark:border-[#323030]">
          <TabsTrigger
            value="thread"
            className="px-2 py-1 text-xs md:px-3 md:py-2 md:text-base"
          >
            Thread
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="px-2 py-1 text-xs md:px-3 md:py-2 md:text-base"
          >
            Thread trả lời
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="px-2 py-1 text-xs md:px-3 md:py-2 md:text-base"
          >
            File phương tiện
          </TabsTrigger>
          <TabsTrigger
            value="reposts"
            className="px-2 py-1 text-xs md:px-3 md:py-2 md:text-base"
          >
            Bài đăng lại
          </TabsTrigger>
        </TabsList>
        <TabsContent value="thread"></TabsContent>
        <TabsContent value="replies"></TabsContent>
        <TabsContent value="media"></TabsContent>
        <TabsContent value="reposts"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
