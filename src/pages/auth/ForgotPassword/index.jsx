import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { forgotPassword } from "@/services/auth";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, watch, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const loading = useSelector(loadingSelector);
  const email = watch("email");
  const isValid = Boolean(email);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(forgotPassword(data)).unwrap();

      if (response.success) {
        toast.success(
          response.message ||
            "Liên kết đặt lại mật khẩu đã được gửi tới email của bạn",
          { autoClose: 3000, theme: "colored", position: "top-center" },
        );
        reset({ email: "" });
      }
    } catch (error) {
      toast.error(error?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.", {
        autoClose: 3000,
        theme: "colored",
        position: "top-center",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          name="email"
          placeholder="Email"
          className="auth-input"
        />
        <Button
          disabled={!isValid || loading}
          size="lg"
          className="text-md cursor-pointer p-6 font-bold"
        >
          {loading && <Spinner />}
          Đặt lại mật khẩu
        </Button>

        <div>
          <Link to={"/login"} className="text-sm font-semibold">
            Quay lại trang đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};
export default ForgotPassword;
