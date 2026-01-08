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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isItemDetailPage = location.pathname.includes("/post/");

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between bg-white px-4 shadow-md md:hidden dark:bg-black dark:shadow-xl">
        {/* Left - Menu/Back Button */}
        <div>
          {isItemDetailPage && (
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
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
              className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
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
    </>
  );
};

export default MobileHeader;
