import { Link, Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";

const DefaultLayout = () => {
  const currentUser = null;

  return (
    <div className="flex">
      <div className="fixed left-0 h-full p-2">
        <Sidebar />
      </div>
      <div className="mr-auto ml-auto flex items-start gap-3 p-5">
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-md mb-3 font-semibold">Trang chủ</h1>
          <div className="min-w-[640px] rounded-4xl border border-gray-300">
            <Outlet />
          </div>
        </div>

        {!currentUser && (
          <div className="mt-9 max-w-[300px] rounded-2xl border bg-[#f5f5f5] p-3 text-center">
            <h2 className="text-lg font-bold">Đăng nhập threads</h2>
            <p className="mt-2 text-gray-500">
              Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
            </p>
            <Button
              className="text-md mt-3 w-full rounded-xl py-5"
              variant="outline"
            >
              <Link to={"/login"}>Đăng nhập để xem thêm</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DefaultLayout;
