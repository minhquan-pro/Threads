import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const DefaultLayout = () => {
  const location = useLocation();
  const currentUser = "MINHQUAN";
  const navigate = useNavigate();

  const currentTab =
    location.pathname === "/" ? "for-you" : location.pathname.replace("/", "");

  return (
    <div className="flex">
      <div className="fixed left-0 h-full p-2">
        <Sidebar />
      </div>
      <div className="mr-auto ml-auto flex items-start gap-3 p-5">
        <div>
          <div className="flex flex-1 flex-col items-center">
            {currentUser ? (
              <Tabs
                value={currentTab}
                defaultValue={"for-you"}
                onValueChange={(e) => {
                  if (e === "for-you") {
                    return navigate("/");
                  }
                  navigate(e);
                }}
              >
                <TabsList className="mb-3 flex gap-5 bg-transparent">
                  <TabsTrigger value="for-you">Dành cho bạn</TabsTrigger>
                  <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
                  <TabsTrigger value="ghost_posts">Bài viết tự hủy</TabsTrigger>
                </TabsList>
                <TabsContent
                  value={currentTab}
                  className="min-w-[640px] rounded-4xl border border-gray-300"
                >
                  <Outlet />
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                <h1 className="text-md mb-3 font-semibold">Trang chủ</h1>
                <Outlet />
              </div>
            )}
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
