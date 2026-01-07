import { Link, useLocation, useNavigate } from "react-router";
import { Menu, LogIn, ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { useCurrentUser } from "@/features/auth";
import { useState } from "react";
import ThemeSubmenu from "@/components/AuthenticatedMenu/components/ThemeSubmenu";

const MobileHeader = () => {
  const currentUser = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        {isItemDetailPage ? (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        )}

        <Link to="/" onClick={handleLogoClick} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faThreads}
            className="text-2xl hover:scale-90 dark:text-white"
          />
        </Link>

        <div>
          {!currentUser && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <LogIn size={18} />
              <span className="text-sm font-semibold">Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
