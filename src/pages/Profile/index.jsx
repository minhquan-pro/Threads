import { useEffect } from "react";
import { useParams } from "react-router";

const Profile = () => {
  const { userId } = useParams();
  useEffect(() => {
    document.title = `${userId} · Threads, bày tỏ nhiều hơn`;

    return () => {
      document.title = "Threads";
    };
  }, [userId]);

  return <div>Profile</div>;
};
export default Profile;
