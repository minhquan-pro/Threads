import { Link, NavLink } from "react-router";

import threads_logo from "@/assets/logo/threads_logo.png";
import { Heart, Home, Plus, Search, User } from "lucide-react";
import classNames from "classnames";
import CreatePostDialog from "@/components/ui/CreatePostDialog";

const navItems = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    component: Plus,
  },
  {
    path: "/activity",
    component: Heart,
  },
  {
    path: "/:userId",
    component: User,
  },
];

const buttonClasses =
  "inline-block rounded-md px-4 py-2 text-gray-500 hover:bg-gray-100";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <Link to={"/"}>
          <img src={threads_logo} alt="" className="h-10 w-10" />
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {navItems.map((nav, index) => {
          const Component = nav.component;

          if (Component === Plus) {
            return (
              <CreatePostDialog
                key={index}
                index={index}
                buttonClasses={buttonClasses}
                Component={Component}
              />
            );
          }
          return (
            <NavLink
              key={index}
              to={nav.path}
              className={classNames(buttonClasses)}
            >
              <Component size={26} />
            </NavLink>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};
export default Sidebar;
