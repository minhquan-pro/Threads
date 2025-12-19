import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Bell, Ellipsis, Fence, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/users/UserAvatar";
import { useCurrentUser } from "@/features/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEMO_FOLLOWERS = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    username: "@nguyenvana",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Trần Thị B",
    username: "@tranthib",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 3,
    name: "Lê Minh C",
    username: "@leminhc",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 4,
    name: "Phạm Thu D",
    username: "@phamthud",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    username: "@hoangvane",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
];

const DEMO_FOLLOWING = [
  {
    id: 6,
    name: "Design Tips",
    username: "@designtips",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 7,
    name: "Tech News",
    username: "@technews",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
  {
    id: 8,
    name: "Coffee Lovers",
    username: "@coffeelovers",
    avatar: "https://i.pravatar.cc/150?img=70",
  },
];

const Profile = () => {
  const { userId } = useParams();
  const currentUser = useCurrentUser();
  const isProfileCurrentUser = userId === "profile";
  const [open, setOpen] = useState(false);

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
    <div>
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
          <div
            className="cursor-pointer text-sm text-gray-600 hover:opacity-90 dark:text-gray-400"
            onClick={() => setOpen(true)}
          >
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

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="p-0 pb-5 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle />
            <Tabs defaultValue="following">
              <TabsList className="w-full bg-transparent">
                <TabsTrigger value="following" className="flex flex-1 flex-col">
                  <span>Đang theo dõi</span>8
                </TabsTrigger>
                <TabsTrigger value="follower" className="flex flex-1 flex-col">
                  <span>Người theo dõi</span>100
                </TabsTrigger>
              </TabsList>
              <TabsContent value={"following"}>
                {DEMO_FOLLOWERS.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 transition hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.username}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-lg border-gray-300 px-4 text-sm font-semibold dark:text-white"
                      >
                        Theo dõi
                      </Button>
                    </div>
                  );
                })}
              </TabsContent>
              <TabsContent value={"follower"}>
                {DEMO_FOLLOWING.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 transition hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.username}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-lg border-gray-300 px-4 text-sm font-semibold dark:text-white"
                      >
                        Theo dõi
                      </Button>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
