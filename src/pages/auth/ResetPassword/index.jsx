import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { validateToken } from "@/services/auth";

const ResetPassword = () => {
  const [validating, setValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const [prams] = useSearchParams();
  const token = prams.get("token");

  const { handleSubmit, register } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await validateToken({ token });
          setIsValidToken(true);
        } catch (error) {
          toast.error(
            error?.message || "Liên kết đã hết hạn hoặc không hợp lệ",
            {
              autoClose: 3000,
              theme: "colored",
              position: "top-center",
            },
          );
          setIsValidToken(false);
        } finally {
          setValidating(false);
        }
      }
    })();
  }, [token]);

  // Submit Form
  const onSubmit = async (data) => {};

  if (validating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner className="mb-4" />
        <p className="text-sm font-semibold text-gray-600">
          Đang xác thực liên kết...
        </p>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-5xl">⚠️</div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Liên kết không hợp lệ
        </h2>
        <p className="mb-6 text-gray-600">
          Liên kết đặt lại mật khẩu đã hết hạn hoặc không đúng.
        </p>
        <Link to="/forgot-password">
          <Button variant="outline">Yêu cầu liên kết mới</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {isValidToken && (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="auth-input"
          />
          <Input
            {...register("password_confirmation")}
            name="password_confirmation"
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="auth-input"
          />

          <Button
            disabled={loading}
            size="lg"
            className="text-md cursor-pointer p-6 font-bold"
          >
            {loading && <Spinner />}
            Tạo mật khẩu mới
          </Button>
        </form>
      )}
    </>
  );
};
export default ResetPassword;
