import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { useCurrentUser } from "@/features/auth";

import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";

const MobileHeader = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState(location.pathname);

  const isHome = location.pathname === "/";
  const isFollowing = location.pathname.startsWith("/following");
  const isItemDetailPage = location.pathname.includes("/post/");
  const showTabs = isHome || isFollowing;

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (!showTabs) {
      navigate(tabActive);
      return;
    }

    window.scrollY === 0
      ? window.location.reload()
      : window.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-15 items-center justify-between bg-white/80 px-4 backdrop-blur-md md:hidden dark:bg-black/80 dark:shadow-xl">
        {/* Left - Menu/Back Button */}
        <div className="mb-3 h-6 w-6">
          {isItemDetailPage && (
            <button
              onClick={() => navigate(-1)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Go back"
            >
              <ArrowLeft />
            </button>
          )}
        </div>

        <Link to="/" onClick={handleLogoClick} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faThreads}
            className="text-4xl hover:scale-90 dark:text-white"
          />
        </Link>

        <div>
          {!currentUser ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-black p-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <span className="text-sm font-semibold">Đăng nhập</span>
            </Link>
          ) : currentUser ? (
            <AuthenticatedMenu />
          ) : (
            <UnauthenticatedMenu />
          )}
        </div>
      </div>

      {/* Mobile Tabs: For You / Following */}
      {currentUser && showTabs && (
        <div className="border-b border-gray-200 bg-white/80 pt-16 backdrop-blur-md md:hidden dark:border-[#2f2f2f] dark:bg-black/80">
          <div className="mx-auto flex max-w-screen-sm">
            <Link
              onClick={() => {
                setTabActive("/");
              }}
              to="/"
              className={`${
                isHome
                  ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } flex-1 py-2 text-center font-semibold`}
            >
              <div>Dành cho bạn</div>
            </Link>
            <Link
              onClick={() => {
                setTabActive("/following");
              }}
              to="/following"
              className={`${
                isFollowing
                  ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } flex-1 py-2 text-center font-semibold`}
            >
              <div>Đang theo dõi</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
