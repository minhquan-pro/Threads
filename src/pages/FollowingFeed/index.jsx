import { useCurrentUser } from "@/features/auth";

import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// DemoVideo
import videoDemo5 from "/videosDemo/video-5.mp4";
import videoDemo6 from "/videosDemo/video-6.mp4";

const demoImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
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
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/612455415_122283125516036290_1325764938759042572_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JG6QAg7_9SQQ7kNvwFWGKny&_nc_oc=AdkvHw1fune71ciWZo6_B9DYec38X0eEQ-K9r3gzdEMGpgEwfYVYNcG7JIm4i6DjpIA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=hFPrwyO2p1FpWCLq9nJCaw&oh=00_AfpqbX44186FQ6ZnU6JMcXrfflG-vthVB_skkQ85JUlMYw&oe=696825F0",
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
    id: 26590,
    user: {
      id: 117,
      username: "foodie_saigon",
      name: "Sài Gòn Ăn Vặt",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      isFollowing: false,
      verified: true,
    },
    content:
      "Phở bò Hà Nội chuẩn vị! Nước dùng trong vắt, thịt mềm tan trong miệng 🍜✨",
    media_urls: [demoImages[0], demoImages[1], demoImages[2]],
    likes_count: 3420,
    reposts_and_quotes_count: 128,
    replies_count: 89,
    created_at: "2h ago",
    is_liked_by_auth: false,
  },
  {
    id: 26591,
    user: {
      id: 118,
      username: "chef_minh",
      name: "Chef Minh Nguyen",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      isFollowing: true,
      verified: true,
    },
    content:
      "Hôm nay thử làm sushi tại nhà! Không ngon bằng tiệm nhưng cũng ổn 😅🍣",
    media_urls: [demoImages[3], demoImages[4], demoImages[5], demoImages[6]],
    likes_count: 1890,
    reposts_and_quotes_count: 45,
    replies_count: 52,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26592,
    user: {
      id: 119,
      username: "travel_eats",
      name: "Travel & Eats",
      avatar_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      isFollowing: true,
      verified: false,
    },
    content:
      "Pizza Napoli ở Ý quả là khác hẳn! Vỏ mỏng giòn, phô mai chảy tràn 🍕🇮🇹",
    media_urls: [demoImages[7], demoImages[0]],
    likes_count: 5620,
    reposts_and_quotes_count: 234,
    replies_count: 156,
    created_at: "8h ago",
    is_liked_by_auth: true,
  },
  {
    id: 26593,
    user: {
      id: 120,
      username: "banh_mi_queen",
      name: "Bánh Mì Sài Gòn",
      avatar_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      isFollowing: false,
      verified: true,
    },
    content:
      "Bánh mì thịt nướng ngon xuất sắc! Bánh giòn rụm, nhân đầy ắp 🥖🔥",
    media_urls: [demoImages[2], demoImages[3], demoImages[4]],
    likes_count: 4120,
    reposts_and_quotes_count: 167,
    replies_count: 93,
    created_at: "1d ago",
    is_liked_by_auth: false,
  },
  {
    id: 26594,
    user: {
      id: 121,
      username: "dessert_lover",
      name: "Sweet Tooth",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      isFollowing: true,
      verified: false,
    },
    content:
      "Matcha tiramisu tự làm! Vị đắng nhẹ hòa quyện với kem cheese béo ngậy 🍰💚",
    media_urls: [demoImages[5], demoImages[6], demoImages[7], demoImages[1]],
    likes_count: 2890,
    reposts_and_quotes_count: 98,
    replies_count: 71,
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
