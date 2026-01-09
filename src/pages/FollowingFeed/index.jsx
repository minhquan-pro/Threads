import { useCurrentUser } from "@/features/auth";

import CreatePost from "@/components/Posts/components/CreatePost";
import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// Dữ liệu demo
const DEMO_POSTS = [
  {
    id: 6,
    user: {
      id: 105,
      username: "minhquanvippro",
      bio: "Do you have that dream if one of your favourite artist  would collab  with another. today it finally happened🥰",
      name: "Quân Minh",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true,
    },
    content:
      "I have been holding my tears back for a while, trying my best to stay strong after so much has happened in my life lately. I feel stuck and on the edge of giving up. I heard this, and it expressed my feelings so well that I burst into tears. It really touched me and made me feel understood. Thank you sincerely for this heartfelt piece.",
    media_urls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=9",
    ],
    likes_count: 445,
    comments_count: 34,
    reposts_count: 67,
    created_at: "1d ago",
    is_liked: true,
  },
  {
    id: 1,
    user: {
      id: 101,
      username: "alice_nguyen",
      name: "Alice Nguyen",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true,
    },
    content:
      "Just finished a great workout session! 💪 Feeling energized and ready to tackle the day. Who else loves morning workouts?",
    media_urls: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
    likes_count: 234,
    comments_count: 18,
    reposts_count: 12,
    created_at: "2h ago",
    is_liked: false,
  },
  {
    id: 2,
    user: {
      id: 102,
      username: "john_dev",
      name: "John Developer",
      avatar: "https://i.pravatar.cc/150?img=2",
      verified: false,
    },
    content:
      "Finally deployed my new React app! 🚀 Learned so much about performance optimization. Check it out and let me know what you think!",
    media_urls: [],
    likes_count: 567,
    comments_count: 45,
    reposts_count: 89,
    created_at: "5h ago",
    is_liked: true,
  },
  {
    id: 3,
    user: {
      id: 103,
      username: "sarah_foodie",
      name: "Sarah's Kitchen",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true,
    },
    content:
      "Made homemade pho today! 🍜 Recipe coming soon on my blog. The secret is in the broth - simmer for at least 8 hours!",
    media_urls: [
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
    likes_count: 892,
    comments_count: 67,
    reposts_count: 134,
    created_at: "8h ago",
    is_liked: true,
  },
  {
    id: 4,
    user: {
      id: 104,
      username: "mike_travels",
      name: "Mike Adventure",
      avatar: "https://i.pravatar.cc/150?img=4",
      verified: false,
    },
    content:
      "Sunset in Da Nang never disappoints! 🌅 This beach is absolutely stunning. Already planning my next trip here.",
    media_urls: ["https://picsum.photos/600/400?random=4"],
    likes_count: 1243,
    comments_count: 93,
    reposts_count: 201,
    created_at: "12h ago",
    is_liked: false,
  },
  {
    id: 5,
    user: {
      id: 105,
      username: "emma_design",
      name: "Emma Design Studio",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true,
    },
    content:
      "New UI design system for our client! Clean, modern, and accessible. What do you think about these color palettes? 🎨",
    media_urls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=9",
    ],
    likes_count: 445,
    comments_count: 34,
    reposts_count: 67,
    created_at: "1d ago",
    is_liked: true,
  },
];

const FollowingFeed = () => {
  const currentUser = useCurrentUser();
  const isDeskTop = useIsDesktop();
  const isShowPadding = isDeskTop || !currentUser;

  return (
    <div
      className={`overflow-hidden bg-white pt-3 pb-14 ${isShowPadding && "pt-16"} dark:bg-[#181818]`}
    >
      {currentUser && <CreatePost />}

      <div className="bg-white dark:bg-[#181818]">
        {DEMO_POSTS.map((post) => (
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
  );
};

export default FollowingFeed;
