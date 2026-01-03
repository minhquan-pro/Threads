import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/services/auth/authService";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Liên kết đã hết hạn hoặc không hợp lệ.");
      setLoading(false);
      return;
    }

    const verifyAccount = async () => {
      try {
        await dispatch(verifyEmail({ token })).unwrap();
        // Redirect to login with success state
        navigate("/login", {
          state: { verified: true },
        });
      } catch (err) {
        setError("Liên kết đã hết hạn hoặc không hợp lệ.");
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
  }, [searchParams, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Đang xác minh...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-red-500">{error}</p>
        <Button
          size="lg"
          className="text-md rounded-lg bg-black p-7 font-bold text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
          onClick={() => navigate("/login")}
        >
          Đi tới trang đăng nhập
        </Button>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
