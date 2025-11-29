import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { resetPassword, validateToken } from "@/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetSchema } from "@/schemas/auth";
import FormField from "@/components/FormField";

const ResetPassword = () => {
  const [validating, setValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prams] = useSearchParams();
  const token = prams.get("token");
  const email = localStorage.getItem("resetEmail");

  const { handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(resetSchema),
  });

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await validateToken({ token });
          setIsValidToken(true);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          setIsValidToken(false);
        } finally {
          setValidating(false);
        }
      }
    })();
  }, [token]);

  // Submit Form
  const onSubmit = async (data) => {
    try {
      await dispatch(resetPassword({ token, email, ...data })).unwrap();
      localStorage.removeItem("resetEmail");
      navigate("/login", {
        state: { message: "Tạo mật khẩu mới thành công, vui lòng đăng nhập" },
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setIsValidToken(false);
    }
  };

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
          Liên kết đã hết hạn hoặc không hợp lệ
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
          <FormField
            name="password"
            type="password"
            control={control}
            placeholder="Mật khẩu"
          />
          <FormField
            name="password_confirmation"
            type="password"
            control={control}
            placeholder="Xác nhận mật khẩu"
          />

          <Button
            disabled={loading}
            size="lg"
            className="text-md p-6 font-bold"
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
