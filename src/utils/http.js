import axios from "axios";

// ============================================
// PHẦN 1: TẠO HTTP CLIENT CƠ BẢN
// ============================================
const baseURL = import.meta.env.VITE_BASE_API;

// Tạo một "công cụ gọi API" riêng cho ứng dụng của chúng ta
// Giống như bạn có một chiếc điện thoại đã cài sẵn số hotline,
// không cần gõ lại địa chỉ API mỗi lần gọi
export const httpClient = axios.create({
  baseURL,
  // baseURL: đây là địa chỉ gốc của server API (ví dụ: https://api.example.com)
  // Các lần gọi API sau chỉ cần thêm đường dẫn phía sau (ví dụ: /users, /products)
});

// ============================================
// PHẦN 2: TỰ ĐỘNG GẮN TOKEN VÀO MỖI REQUEST
// ============================================

// Interceptor (bộ chặn) request: chạy TRƯỚC KHI gửi bất kỳ request nào
// Giống như người bảo vệ kiểm tra thẻ của bạn trước khi cho vào cửa
httpClient.interceptors.request.use((config) => {
  // Lấy accessToken từ localStorage (nơi lưu token sau khi đăng nhập)
  const accessToken = localStorage.getItem("accessToken");

  // Nếu có token, thì tự động đính kèm vào header của request
  if (accessToken) {
    // Format: "Bearer abc123xyz" - đây là chuẩn để gửi token
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // Trả về config đã được chỉnh sửa để tiếp tục gửi request
  return config;
});

// ============================================
// PHẦN 3: XỬ LÝ LÀM MỚI TOKEN TỰ ĐỘNG
// ============================================

// Biến theo dõi xem có đang làm mới token không
// Tránh trường hợp nhiều request cùng lúc đều cố gắng làm mới token
let isRefreshing = false;

// Hàng đợi chứa các request bị lỗi 401 (hết hạn token)
// Giống như hàng người chờ, khi có token mới sẽ cho tất cả vào cùng lúc
let failedQueue = [];

// Hàm xử lý tất cả request đang chờ trong hàng đợi
const processQueue = (error) => {
  // Duyệt qua từng request đang chờ
  failedQueue.forEach((prom) => {
    if (error) {
      // Nếu có lỗi (làm mới token thất bại), thông báo lỗi cho tất cả
      prom.reject(error);
    } else {
      // Nếu thành công, cho phép tất cả request thử lại
      prom.resolve();
    }
  });

  // Xóa sạch hàng đợi sau khi xử lý xong
  failedQueue = [];
};

// Hàm thực hiện việc làm mới token
const refreshToken = async () => {
  try {
    // Gọi API làm mới token bằng refreshToken hiện có
    const result = await axios.post(`${baseURL}/auth/refresh-token`, {
      refresh_token: localStorage.getItem("refreshToken"),
    });

    // Lưu cặp token mới vào localStorage
    localStorage.setItem("accessToken", result.data.data.access_token);
    localStorage.setItem("refreshToken", result.data.data.refresh_token);

    // Thông báo thành công cho tất cả request đang chờ
    processQueue(null);
  } catch (error) {
    // Nếu làm mới token thất bại, thông báo lỗi cho tất cả
    processQueue(error);
    throw error; // Ném lỗi để hàm gọi biết việc làm mới thất bại
  }
};

// Hàm điều phối việc lấy token mới
// Đảm bảo chỉ có 1 request làm mới token tại một thời điểm
const getNewToken = async () => {
  // Nếu chưa có ai đang làm mới token
  if (!isRefreshing) {
    isRefreshing = true; // Đánh dấu là đang làm mới
    await refreshToken(); // Thực hiện làm mới token
    isRefreshing = false; // Đánh dấu hoàn thành
    return;
  }

  // Nếu đã có request khác đang làm mới token
  // Thì request này sẽ xếp hàng chờ đợi
  return new Promise((resolve, reject) => {
    // Thêm vào hàng đợi, sẽ được xử lý khi token mới sẵn sàng
    failedQueue.push({ resolve, reject });
  });
};

// ============================================
// PHẦN 4: XỬ LÝ RESPONSE VÀ LÀM MỚI TOKEN
// ============================================

// Interceptor (bộ chặn) response: chạy SAU KHI nhận được phản hồi từ server
httpClient.interceptors.response.use(
  // Nếu response thành công (status 200-299), trả về nguyên bản
  (response) => response,

  // Nếu có lỗi, xử lý ở đây
  async (error) => {
    // Lưu lại thông tin request gốc để có thể thử lại sau
    const originalRequest = error.config;

    // Bỏ qua refresh token cho các route auth (login, register, etc)
    const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/forgot-password");

    // Kiểm tra xem có nên làm mới token không:
    // - Lỗi 401 (Unauthorized - token hết hạn)
    // - Request này chưa từng được thử lại (_retry chưa set)
    // - KHÔNG phải route auth (login/register không cần refresh token)
    const shouldRenewToken =
      error.response?.status === 401 && !originalRequest._retry && !isAuthRoute;

    if (shouldRenewToken) {
      // Đánh dấu request này đã được thử lại, tránh lặp vô hạn
      originalRequest._retry = true;

      try {
        // Lấy token mới
        await getNewToken();

        // Thử lại request ban đầu với token mới
        // httpClient sẽ tự động gắn token mới vào (nhờ interceptor request)
        return httpClient(originalRequest);
      } catch (error) {
        // Nếu làm mới token thất bại, trả về lỗi
        // (Thường thì sẽ redirect về trang login)
        return Promise.reject(error);
      }
    }

    // Nếu không phải lỗi 401 hoặc đã thử lại rồi, trả về lỗi bình thường
    return Promise.reject(error);
  },
);

// ============================================
// PHẦN 5: CÁC HÀM TIỆN ÍCH ĐỂ GỌI API
// ============================================

// Hàm nội bộ dùng chung để gửi request
// Không export ra ngoài vì chỉ dùng trong file này
const _send = async (method, path, data, config) => {
  // Gọi API với đầy đủ thông tin
  const response = await httpClient.request({
    ...config, // Các config tùy chỉnh (nếu có)
    method, // GET, POST, PUT, PATCH, DELETE
    url: path, // Đường dẫn API (ví dụ: /users)
    data, // Dữ liệu gửi đi (với POST, PUT, PATCH)
  });

  // Chỉ trả về phần data, bỏ qua headers và thông tin khác
  return response.data;
};

// Hàm GET: lấy dữ liệu từ server
// Ví dụ: get('/users') -> lấy danh sách users
const get = async (path, config) => {
  return await _send("get", path, null, config);
  // null vì GET không gửi data trong body
};

// Hàm POST: tạo mới dữ liệu
// Ví dụ: post('/users', { name: 'John' }) -> tạo user mới
const post = async (path, data, config) => {
  return await _send("post", path, data, config);
};

// Hàm PUT: cập nhật toàn bộ dữ liệu
// Ví dụ: put('/users/1', { name: 'John', age: 30 }) -> cập nhật user id=1
const put = async (path, data, config) => {
  return await _send("put", path, data, config);
};

// Hàm PATCH: cập nhật một phần dữ liệu
// Ví dụ: patch('/users/1', { age: 31 }) -> chỉ cập nhật tuổi
const patch = async (path, data, config) => {
  return await _send("patch", path, data, config);
};

// Hàm DELETE: xóa dữ liệu
// Ví dụ: del('/users/1') -> xóa user id=1
const del = async (path, config) => {
  return await _send("delete", path, null, config);
  // null vì DELETE không gửi data trong body
};

// Export object chứa tất cả các hàm để sử dụng ở các file khác
const http = { get, post, put, patch, del };

export default http;
