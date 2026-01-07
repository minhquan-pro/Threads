import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { forgotPassword } from "@/services/auth";
import FormField from "@/components/FormField";
import { forgotPasswordSchema } from "@/schemas/auth";
import { toast } from "@/utils/toast";

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
          "Liên kết đặt lại mật khẩu đã được gửi tới email của bạn",
          {
            theme: "colored",
          },
        );
        reset({ email: "" });
        localStorage.setItem("resetEmail", data.email);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", { theme: "colored" });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField name="email" placeholder="Email" control={control} />
        <Button
          disabled={!isValid || loading}
          size="lg"
          className="text-md p-6 font-bold"
        >
          {loading && <Spinner />}
          Đặt lại mật khẩu
        </Button>

        <Link
          to={"/login"}
          className="text-sm font-semibold dark:text-gray-300 dark:hover:text-white"
        >
          Quay lại trang đăng nhập
        </Link>
      </form>
    </>
  );
};
export default ForgotPassword;
