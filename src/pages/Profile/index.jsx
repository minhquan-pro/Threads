import { useParams } from "react-router";
import { useEffect } from "react";
import { Fence } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/users/UserAvatar";
import { useCurrentUser } from "@/features/auth";
import Home from "../Home";

const Profile = () => {
  const { userId } = useParams();
  const currentUser = useCurrentUser();
  useEffect(() => {
    document.title = `${userId} · Threads, bày tỏ nhiều hơn`;

    return () => {
      document.title = "Threads";
    };
  }, [userId]);

  return (
    <div>
      <div className="p-6 dark:text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{currentUser.name}</p>
            <span>{currentUser.username}</span>
          </div>
          <UserAvatar imgSize="w-20 h-20" />
        </div>
        <p className="mt-6 mb-1">{currentUser?.bio}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">2 người theo dõi</span>
          <Button className={"border-none shadow-none"} variant={"outline"}>
            <Fence />
          </Button>
        </div>
        <Button className={"mt-6 w-full border-gray-300"} variant={"outline"}>
          Chỉnh sửa trang cá nhân{" "}
        </Button>
      </div>
      <Tabs defaultValue={"thread"} className="mt-4 border-gray-300 pb-5">
        <TabsList className="w-full justify-between border-b border-gray-300 bg-transparent px-6 pb-6 dark:border-gray-800">
          <TabsTrigger value="thread">Thread</TabsTrigger>
          <TabsTrigger value="replies">Thread trả lời</TabsTrigger>
          <TabsTrigger value="media">File phương tiện</TabsTrigger>
          <TabsTrigger value="reposts">Bài đăng lại</TabsTrigger>
        </TabsList>
        <TabsContent value="thread">
          <Home />
        </TabsContent>
        <TabsContent value="replies">
          <Home />
        </TabsContent>

        <TabsContent value="media">
          <Home />
        </TabsContent>
        <TabsContent value="reposts">
          <Home />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Profile;
