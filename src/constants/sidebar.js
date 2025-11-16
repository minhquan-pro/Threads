import { Home, Search, Plus, Heart, User } from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "home",
    path: "/",
    component: Home,
    requireAuth: false,
  },
  {
    id: "search",
    path: "/search",
    component: Search,
    requireAuth: false,
  },
  {
    id: "create",
    component: Plus,
    requireAuth: true,
    dialogTitle: "Đăng nhập để đăng",
    dialogDescription:
      "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
  },
  {
    id: "activity",
    path: "/activity",
    component: Heart,
    requireAuth: true,
    dialogTitle: "Bày tỏ nhiều hơn qua Threads",
    dialogDescription:
      "Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa.",
  },
  {
    id: "profile",
    path: "/profile",
    component: User,
    requireAuth: true,
    dialogTitle: "Bày tỏ nhiều hơn qua Threads",
    dialogDescription:
      "Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa.",
  },
];
