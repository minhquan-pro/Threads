import { useParams } from "react-router";
import { useEffect } from "react";
import { Bell, Ellipsis, Fence, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/users/UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";

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
    document.title = `${displayUser.name} (@${displayUser.username}) · Threads`;
    return () => {
      document.title = "Threads";
    };
  }, [displayUser.name, displayUser.username]);

  return (
    <div className="pt-10">
      <div className="p-6 dark:text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{displayUser.name}</p>
            <span className="text-gray-600 dark:text-gray-400">
              {displayUser.username}
            </span>
          </div>
          <UserAvatar imgSize="w-20 h-20" />
        </div>

        <p className="mt-6 mb-1">{displayUser.bio || "Chưa có tiểu sử"}</p>

        <div className="flex items-center justify-between">
          <div className="cursor-pointer text-sm text-gray-600 hover:opacity-90 dark:text-gray-400">
            {displayUser.followers || 0} người theo dõi
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
          <Button className={"mt-6 w-full border-gray-300"} variant={"outline"}>
            Chỉnh sửa trang cá nhân
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              className={"mt-6 flex-1 border-gray-300"}
              variant={"outline"}
            >
              Theo dõi
            </Button>
            <Button
              className={"mt-6 flex-1 border-gray-300"}
              variant={"outline"}
            >
              Nhắc đến
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue={"thread"} className="mt-4 border-gray-300 pb-5">
        <TabsList className="w-full justify-between border-b border-gray-300 bg-transparent px-6 pb-6 dark:border-gray-800">
          <TabsTrigger value="thread">Thread</TabsTrigger>
          <TabsTrigger value="replies">Thread trả lời</TabsTrigger>
          <TabsTrigger value="media">File phương tiện</TabsTrigger>
          <TabsTrigger value="reposts">Bài đăng lại</TabsTrigger>
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
