import { Link, Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";

const DefaultLayout = () => {
  const currentUser = null;

  return (
    <div className="flex h-screen overflow-y-hidden">
      <div className="fixed left-0 h-full p-2">
        <Sidebar />
      </div>
      <div className="mr-auto ml-auto flex items-start gap-3 py-5">
        <Outlet />
        {/* {!currentUser && (
          <div className="max-w-[300px] rounded-2xl border bg-gray-100 p-3 text-center">
            <h2 className="text-lg font-bold">
              Đăng nhập hoặc đăng ký threads
            </h2>
            <p className="mt-2 text-gray-500">
              Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
            </p>
            <Button className="mt-3 w-full py-6 text-lg" variant="outline">
              <Link to={"/login"}>Đăng nhập để xem thêm</Link>
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default DefaultLayout;
