import { useParams } from "react-router";
import { useEffect } from "react";
import { Bell, Ellipsis, Fence, Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserAvatar from "@/components/users/UserAvatar";
import { useCurrentUser } from "@/features/auth";

import FollowerPreview from "@/components/users/FollowerPreview";
import FeedItem from "@/components/Posts/FeedItem";

const FAKE_POSTS = [
  {
    id: 30001,
    user: {
      id: 201,
      username: "quanminh_dev",
      name: "Quân Minh",
      avatar_url: "https://i.pravatar.cc/400?img=12",
      verified: false,
      isFollowing: true,
    },
    content: `Cuối cùng cũng hoàn thành được cái project mà mình đã code suốt 3 tháng qua 🎉

Từ những dòng code đầu tiên đến lúc deploy lên production, mỗi bug fix đều là một bài học quý giá. Cảm ơn team đã support nhiệt tình! 

Giờ thì... nghỉ ngơi xứng đáng thôi! 😴`,
    media_urls: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    ],
    likes_count: 456,
    reposts_and_quotes_count: 23,
    replies_count: 67,
    created_at: "2h ago",
    is_liked_by_auth: false,
  },
  {
    id: 30002,
    user: {
      id: 201,
      username: "quanminh_dev",
      name: "Quân Minh",
      avatar_url: "https://i.pravatar.cc/400?img=12",
      verified: false,
      isFollowing: true,
    },
    content: `Sáng nay đi uống cà phê ở quán quen, ngồi 1 mình nhìn người qua lại mà suy nghĩ về cuộc đời...

Đôi khi chúng ta cứ chạy theo những thứ xa vời, mà quên mất hạnh phúc đơn giản ngay trước mắt.

Một buổi sáng yên bình, một tách cà phê đậm đà, và khoảng thời gian để suy ngẫm - đó cũng là hạnh phúc rồi ☕️✨`,
    media_urls: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],
    likes_count: 892,
    reposts_and_quotes_count: 45,
    replies_count: 134,
    created_at: "2026-01-10T08:30:00.000000Z",
    is_liked_by_auth: true,
  },
  {
    id: 30003,
    user: {
      id: 201,
      username: "quanminh_dev",
      name: "Quân Minh",
      avatar_url: "https://i.pravatar.cc/400?img=12",
      verified: false,
      isFollowing: true,
    },
    content: `3 điều mình học được trong năm qua:

1. Đừng so sánh process của mình với highlight reel của người khác
2. Học cách nói "không" cũng quan trọng như học cách nói "có"  
3. Sức khỏe tinh thần > Sự nghiệp thành công

Năm mới, mình sẽ cố gắng sống chậm lại một chút, để cảm nhận nhiều hơn 🌱`,
    media_urls: [],
    likes_count: 1243,
    reposts_and_quotes_count: 189,
    replies_count: 201,
    created_at: "2026-01-05T15:45:00.000000Z",
    is_liked_by_auth: true,
  },
  {
    id: 30004,
    user: {
      id: 201,
      username: "quanminh_dev",
      name: "Quân Minh",
      avatar_url: "https://i.pravatar.cc/400?img=12",
      verified: false,
      isFollowing: true,
    },
    content: `Hôm nay làm việc remote ở Đà Lạt và mình nghĩ... đây chính là lý do tại sao mình yêu nghề này 💻🌲

Có thể làm việc ở bất kỳ đâu, miễn là có wifi và laptop. View núi đồi, không khí mát mẻ, productivity tăng vọt!

Ai đang plan workation thì Đà Lạt highly recommended nha! 🏔️`,
    media_urls: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    ],
    likes_count: 2156,
    reposts_and_quotes_count: 312,
    replies_count: 445,
    created_at: "2025-12-28T10:20:00.000000Z",
    is_liked_by_auth: false,
  },
  {
    id: 30005,
    user: {
      id: 201,
      username: "quanminh_dev",
      name: "Quân Minh",
      avatar_url: "https://i.pravatar.cc/400?img=12",
      verified: false,
      isFollowing: true,
    },
    content: `Mấy đứa bạn hỏi: "Sao mày lúc nào cũng tích cực vậy?"

Thật ra không phải lúc nào mình cũng tích cực đâu. Cũng có những ngày down, những lúc muốn bỏ cuộc. Nhưng mình chọn cách chia sẻ những khoảnh khắc đẹp, những suy nghĩ tích cực để nhắc bản thân và mọi người rằng: cuộc sống vẫn có nhiều điều đáng trân trọng.

Behind every positive post is a human being with real struggles. Let's be kind to each other ❤️`,
    media_urls: [],
    likes_count: 3421,
    reposts_and_quotes_count: 567,
    replies_count: 892,
    created_at: "2025-12-20T18:00:00.000000Z",
    is_liked_by_auth: true,
  },
];

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
    <div className="pt-16 md:pt-10">
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
        <TabsContent value="thread">
          {" "}
          <div className={`overflow-hidden bg-white dark:bg-[#181818]`}>
            <div className="bg-white dark:bg-[#181818]">
              {FAKE_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="border-t border-gray-300 first-of-type:border-none dark:border-[#323030]"
                >
                  <div className="flex max-w-[640px] flex-col items-start overflow-hidden bg-white px-4 py-3 dark:bg-[#181818]">
                    <FeedItem post={post} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="replies"></TabsContent>
        <TabsContent value="media"></TabsContent>
        <TabsContent value="reposts"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
