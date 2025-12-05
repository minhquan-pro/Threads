import { HOME_FEED_ROUTES, NAV_ITEMS, ROUTES, TAB_VALUES } from "@/constants";
import { useLocation, useNavigate } from "react-router";

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeFeedRoute = HOME_FEED_ROUTES.includes(location.pathname);
  const currentTab =
    location.pathname === ROUTES.HOME
      ? TAB_VALUES.FOR_YOU
      : location.pathname.replace("/", "");

  const handleValueChange = (value) => {
    const route = value === TAB_VALUES.FOR_YOU ? ROUTES.HOME : `/${value}`;
    return navigate(route);
  };

  return { isHomeFeedRoute, currentTab, handleValueChange };
};

export const useTitle = (currentTab) => {
  const location = useLocation();
  const isPagePostDetail = location.pathname.includes("/post/");
  const defaultTitle = isPagePostDetail ? "Thread" : "Trang chủ";

  return NAV_ITEMS.find((nav) => nav.id === currentTab)?.title || defaultTitle;
};
