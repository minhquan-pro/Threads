export const MENU_OFFSET = {
  side: 10,
  align: 20,
};

export const MENU_ITEMS = {
  appearance: {
    label: "Giao diện",
    hasSubmenu: true,
    action: "appearance",
  },
  details: {
    label: "Thông tin chi tiết",
    action: "details",
  },
  settings: {
    label: "Cài đặt",
    action: "settings",
  },
  feed: {
    label: "Bảng feed",
    hasSubmenu: true,
    action: "feed",
  },
  saved: {
    label: "Đã lưu",
    action: "saved",
  },
  liked: {
    label: "Đã thích",
    action: "liked",
  },
  report: {
    label: "Báo cáo sự cố",
    action: "report",
  },
  logout: {
    label: "Đăng xuất",
    variant: "destructive",
    action: "logout",
  },
};

export const MENU_GROUPS = {
  settings: ["appearance", "details", "settings"],
  content: ["feed", "saved", "liked"],
  actions: ["report", "logout"],
};
