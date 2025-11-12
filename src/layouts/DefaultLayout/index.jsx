import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

const DefaultLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
