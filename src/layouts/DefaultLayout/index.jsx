import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Instagram, Plus } from "lucide-react";

import Sidebar from "./components/Sidebar";
import { useNavigation, useTitle } from "@/hooks/useNavigation";
import HomeTabs from "@/pages/Home/components/HomeTabs";
import { useCurrentUser } from "@/features/auth";
import CurvedBorderBottom from "@/components/CurvedBorderBottom";

const DefaultLayout = () => {
  const currentUser = useCurrentUser();
  const { currentTab, handleValueChange, isHomeFeedRoute } = useNavigation();
  const showTabs = isHomeFeedRoute && currentUser;
  const title = useTitle(currentTab);

  return (
    <div className="flex">
      <div className="fixed left-0 h-full">
        <Sidebar />
      </div>
      <div className="mx-auto flex items-start gap-3 pb-3">
        <div>
          <div className="flex flex-1 flex-col items-center">
            {showTabs ? (
              <HomeTabs
                currentTab={currentTab}
                handleValueChange={handleValueChange}
              >
                <Outlet />
              </HomeTabs>
            ) : (
              <div>
                <div className="sticky top-0 z-50 w-[700px] border-gray-200 bg-white p-4">
                  <h1 className="text-md text-center font-semibold">{title}</h1>
                  <CurvedBorderBottom />
                </div>
                <div className="flex justify-center">
                  <div className="relative w-[650px] overflow-x-hidden overflow-y-auto border border-gray-200 border-t-transparent shadow-md">
                    <Outlet />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!currentUser && (
          <div className="sticky top-14 z-50 mt-9 max-w-[300px] rounded-2xl border border-gray-300 bg-[#f5f5f5] p-3 text-center">
            <h2 className="text-lg font-bold">
              Đăng nhập hoặc đăng ký threads
            </h2>
            <p className="mt-2 text-gray-500">
              Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
            </p>
            <Button
              asChild
              className="mt-3 mb-4 w-full rounded-xl py-8"
              variant="outline"
            >
              <Link to={"/login"} className="flex items-center gap-3">
                <Instagram />
                <div className="flex flex-col items-start">
                  <span className="text-gray-500">Tiếp tục bằng instagram</span>
                  <span className="font-bold">quanlm02227</span>
                </div>
              </Link>
            </Button>
            <Link to={"/login"} className="text-sm font-semibold text-gray-400">
              Đăng nhập bằng tên người dùng
            </Link>
          </div>
        )}
      </div>
      <div className="fixed right-8 bottom-8">
        <Button variant="outline" className="h-16 w-20">
          <Plus strokeWidth={2.5} className="size-7" />
        </Button>
      </div>
    </div>
  );
};
export default DefaultLayout;
