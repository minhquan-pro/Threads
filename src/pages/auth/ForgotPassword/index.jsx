import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { forgotPassword } from "@/services/auth";
import { toast } from "react-toastify";
import { Link } from "react-router";
import FormField from "@/components/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/schemas/auth";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
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
          { autoClose: 1000, theme: "colored", position: "top-center" },
        );
        reset({ email: "" });
      }
    } catch (error) {
      toast.error(error?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.", {
        autoClose: 1000,
        theme: "colored",
        position: "top-center",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField name="email" placeholder="Email" control={control} />
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
