export const DIALOG_CONFIGS = {
  delete: {
    title: "Xóa bài viết",
    description: "Nếu xóa bài viết này, bạn sẽ không khôi phục được nữa.",
    confirmLabel: "Xóa",
    variant: "destructive",
  },
  block: (username) => ({
    title: `Chặn ${username}`,
    description: `${username} sẽ không thể tìm thấy trang cá nhân hay nội dung của bạn. Sẽ không có ai nhìn thấy câu trả lời của họ cho bài viết của bạn. Họ cũng không được thông báo là bạn đã chặn họ.`,
    confirmLabel: "Chặn",
    variant: "destructive",
  }),
  unblock: (username) => ({
    title: `Bỏ chặn ${username}`,
    description: `${username} cùng với các tài khoản khác mà họ có thể có sẽ xem được trang cá nhân và nội dung của bạn. Tuy nhiên, chúng tôi sẽ không thông báo cho họ rằng bạn đã bỏ chặn họ.`,
    confirmLabel: "Bỏ chặn",
    variant: "default",
  }),
};
