import { useCurrentUser } from "@/features/auth";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
