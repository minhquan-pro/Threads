import { useCurrentUser } from "@/features/auth";

import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// DemoVideo
import videoDemo5 from "/videosDemo/video-5.mp4";
import videoDemo6 from "/videosDemo/video-6.mp4";

const demoImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", // Tech/AI
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800", // Coding
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", // Laptop/workspace
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800", // Technology
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", // Data/circuits
  "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800", // Code on screen
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800", // Developer
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", // Digital world
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", // Coding workspace
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800", // Code editor
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", // Programming
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", // Robot/AI
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", // Tech setup
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800", // Team coding
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800", // Office tech
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800", // AI concept
];

// Dữ liệu demo
const DEMO_POSTS = [
  {
    id: 26589,
    user: {
      id: 116,
      username: "ygt1016",
      name: "ygt1016",
      avatar_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      isFollowing: true,
      verified: true,
    },
    content: "大阪必吃美乃滋大阪燒！店員每個都好會噴！",
    media_urls: [videoDemo5, videoDemo6],
    likes_count: 2500,
    reposts_and_quotes_count: 50,
    replies_count: 37,
    created_at: "4h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26589,
    user: {
      id: 116,
      username: "tech_insider",
      name: "Tech Insider VN",
      avatar_url:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
      isFollowing: true,
      verified: true,
    },
    content:
      "Apple vừa ra mắt chip M4 Ultra - hiệu năng gấp 3 lần M3! AI xử lý nhanh hơn bao giờ hết 🚀💻",
    media_urls: [demoImages[0], demoImages[4], demoImages[11], demoImages[15]],
    likes_count: 8500,
    reposts_and_quotes_count: 420,
    replies_count: 156,
    created_at: "2h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26590,
    user: {
      id: 117,
      username: "code_master",
      name: "Nguyễn Văn Dev",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      isFollowing: false,
      verified: true,
    },
    content:
      "Mới học xong React 19! Server Components thật sự thay đổi cách mình code. Tutorial đầy đủ tại 👇",
    media_urls: [
      demoImages[1],
      demoImages[5],
      demoImages[6],
      demoImages[9],
      demoImages[10],
    ],
    likes_count: 5420,
    reposts_and_quotes_count: 280,
    replies_count: 203,
    created_at: "4h ago",
    is_liked_by_auth: false,
  },
  {
    id: 26591,
    user: {
      id: 118,
      username: "ai_researcher",
      name: "Dr. Minh AI Lab",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      isFollowing: true,
      verified: true,
    },
    content:
      "ChatGPT-5 có thể suy luận logic phức tạp như con người! Kỷ nguyên AGI đang đến gần hơn bao giờ hết 🤖✨",
    media_urls: [
      demoImages[0],
      demoImages[7],
      demoImages[11],
      demoImages[15],
      demoImages[4],
      demoImages[3],
    ],
    likes_count: 12890,
    reposts_and_quotes_count: 1045,
    replies_count: 687,
    created_at: "6h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26592,
    user: {
      id: 119,
      username: "startup_vn",
      name: "Vietnam Startup News",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      isFollowing: true,
      verified: false,
    },
    content:
      "Startup fintech Việt vừa gọi vốn thành công 50 triệu USD! Chuẩn bị mở rộng ra thị trường Đông Nam Á 🇻🇳💰",
    media_urls: [
      demoImages[2],
      demoImages[3],
      demoImages[12],
      demoImages[13],
      demoImages[14],
    ],
    likes_count: 6720,
    reposts_and_quotes_count: 534,
    replies_count: 234,
    created_at: "8h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26593,
    user: {
      id: 120,
      username: "cyber_security",
      name: "CyberSec Vietnam",
      avatar_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      isFollowing: false,
      verified: true,
    },
    content:
      "⚠️ Cảnh báo: Lỗ hổng zero-day trên Windows mới phát hiện! Cập nhật hệ thống ngay để tránh bị tấn công 🛡️",
    media_urls: [
      demoImages[4],
      demoImages[5],
      demoImages[7],
      demoImages[8],
      demoImages[10],
    ],
    likes_count: 9120,
    reposts_and_quotes_count: 2167,
    replies_count: 445,
    created_at: "12h ago",
    is_liked_by_auth: false,
  },
  {
    id: 26594,
    user: {
      id: 121,
      username: "gadget_review",
      name: "Tech Review VN",
      avatar_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      isFollowing: true,
      verified: false,
    },
    content:
      "Đánh giá iPhone 16 Pro Max sau 1 tháng sử dụng: Pin trâu, camera đỉnh, nhưng giá... 📱💸",
    media_urls: [
      demoImages[3],
      demoImages[6],
      demoImages[2],
      demoImages[1],
      demoImages[12],
      demoImages[8],
    ],
    likes_count: 7890,
    reposts_and_quotes_count: 398,
    replies_count: 512,
    created_at: "1d ago",
    is_liked_by_auth: true,
  },
];

const FollowingFeed = () => {
  const currentUser = useCurrentUser();
  const isDeskTop = useIsDesktop();
  const isShowPadding = isDeskTop || !currentUser;

  return (
    <div
      className={`overflow-hidden bg-white pt-3 ${isShowPadding && "pt-16"} dark:bg-[#181818]`}
    >
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
