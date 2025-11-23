import { useFetchCurrentUser } from "@/features/auth";

const AuthProvider = () => {
  useFetchCurrentUser();
  return null;
};
export default AuthProvider;
