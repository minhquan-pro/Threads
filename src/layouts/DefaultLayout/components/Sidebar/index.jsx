import { Link, NavLink } from "react-router";

import threads_logo from "@/assets/logo/threads_logo.png";
import { Heart, Home, Plus, Search, User } from "lucide-react";
import classNames from "classnames";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";

const navItems = [
  {
    id: "home",
    path: "/",
    component: Home,
    requireAuth: false,
  },
  {
    id: "search",
    path: "/search",
    component: Search,
    requireAuth: false,
  },
  {
    id: "create",
    component: Plus,
    requireAuth: true,
    dialogTitle: "Đăng nhập để đăng",
    dialogDescription:
      "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
  },
  {
    id: "activity",
    path: "/activity",
    component: Heart,
    requireAuth: true,
    dialogTitle: "Bày tỏ nhiều hơn qua Threads",
    dialogDescription:
      "Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa.",
  },
  {
    id: "profile",
    path: "/profile",
    component: User,
    requireAuth: true,
    dialogTitle: "Bày tỏ nhiều hơn qua Threads",
    dialogDescription:
      "Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa.",
  },
];

const buttonClasses =
  "inline-block rounded-md px-5 py-3 text-gray-500 hover:bg-gray-100 cursor-pointer";

const Sidebar = () => {
  const currentUser = "Minquan";
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Link to={"/"}>
          <img src={threads_logo} alt="" className="h-12 w-10" />
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        {navItems.map((nav) => {
          const currentUser = null;
          const Component = nav.component;

          if (nav.requireAuth && !currentUser) {
            return (
              <AuthRequiredDialog
                id={nav.id}
                key={nav.id}
                title={nav.dialogTitle}
                description={nav.dialogDescription}
                buttonClasses={buttonClasses}
                Component={Component}
              />
            );
          }

          return (
            <NavLink
              key={nav.id}
              to={nav.path}
              className={classNames(buttonClasses)}
            >
              <Component size={26} />
            </NavLink>
          );
        })}
      </div>
      {currentUser ? (
        <AuthenticatedMenu buttonClasses={buttonClasses} />
      ) : (
        <UnauthenticatedMenu buttonClasses={buttonClasses} />
      )}
    </div>
  );
};
export default Sidebar;
