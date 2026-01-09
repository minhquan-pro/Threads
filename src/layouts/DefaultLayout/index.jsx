import { useState } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Instagram, Menu, Moon, Plus, Sun } from "lucide-react";

import Sidebar from "./components/Sidebar";
import { useNavigation, useTitle } from "@/hooks/useNavigation";
import HomeTabs from "@/pages/Home/components/HomeTabs";
import { useCurrentUser } from "@/features/auth";
import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import CreatePostForm from "@/components/Posts/components/CreatePostForm";

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useCurrentUser();
  const { currentTab, handleValueChange, isHomeFeedRoute } = useNavigation();
  const showTabs = isHomeFeedRoute && currentUser;
  const title = useTitle(currentTab);

  return (
    <div className="bg-white dark:bg-black">
      <MobileHeader />
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-auto justify-center md:top-0 md:right-auto md:bottom-auto md:left-0 md:z-0 md:flex md:h-full md:w-auto">
        <Sidebar />
      </div>

      {showTabs ? (
        <HomeTabs currentTab={currentTab} handleValueChange={handleValueChange}>
          <Outlet />
        </HomeTabs>
      ) : (
        <div>
          <div className="hidden md:block">
            <Header title={title} />
          </div>
          <div className="flex min-h-screen justify-center md:pt-0">
            <div className="relative w-[650px] border-gray-200 border-t-transparent shadow-md md:border-x dark:border-[#181818] dark:bg-[#181818]">
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="fixed top-5 right-20 z-50 mt-9 hidden max-w-[300px] rounded-2xl border border-gray-300 bg-[#f5f5f5] p-5 text-center md:block dark:border-[#181818] dark:bg-[#181818]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Đăng nhập hoặc đăng ký threads
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
          </p>
          <Button
            asChild
            className="mt-3 mb-4 w-full rounded-xl border-gray-300 py-8 dark:bg-[#181818] dark:text-white dark:hover:bg-gray-700"
            variant="outline"
          >
            <Link to={"/login"} className="flex items-center gap-3">
              <Instagram />
              <span className="text-gray-800 dark:text-gray-200">
                Tiếp tục bằng instagram
              </span>
            </Link>
          </Button>
          <Link
            to={"/login"}
            className="text-sm font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            Đăng nhập bằng tên người dùng
          </Link>
        </div>
      )}

      {currentUser && (
        <>
          <div className="fixed right-8 bottom-8 z-10 hidden md:block">
            {!isOpen ? (
              <Button
                variant="outline"
                className="h-16 w-20 border-gray-300 shadow-md dark:bg-black dark:text-white"
                onClick={() => setIsOpen(true)}
              >
                <Plus strokeWidth={2.5} className="size-7" />
              </Button>
            ) : (
              <CreatePostForm open={isOpen} onClose={() => setIsOpen(false)} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DefaultLayout;
