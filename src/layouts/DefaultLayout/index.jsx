import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Sidebar from "./components/Sidebar";
import { useNavigation, useTitle } from "@/hooks/useNavigation";
import HomeTabs from "@/pages/Home/components/HomeTabs";
import { useCurrentUser } from "@/features/auth";

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
                <div className="overflow-visible bg-transparent!">
                  <Outlet />
                </div>
              </HomeTabs>
            ) : (
              <div>
                <div className="sticky top-0 z-50 border-b border-gray-300 bg-white p-4">
                  <h1 className="text-md text-center font-semibold">{title}</h1>
                </div>
                <div className="min-w-[640px] overflow-y-auto border border-gray-300 border-t-transparent">
                  <Outlet />
                </div>
              </div>
            )}
          </div>
        </div>
        {!currentUser && (
          <div className="sticky top-14 mt-9 max-w-[300px] rounded-2xl border border-gray-300 bg-[#f5f5f5] p-3 text-center">
            <h2 className="text-lg font-bold">
              Đăng nhập hoặc đăng ký threads
            </h2>
            <p className="mt-2 text-gray-500">
              Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
            </p>
            <Button
              className="text-md mt-3 w-full rounded-xl py-8"
              variant="outline"
            >
              <Link to={"/login"}>Đăng nhập bằng tên người dùng</Link>
            </Button>
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
