import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { register as registerService } from "@/services/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const loading = useSelector(loadingSelector);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerService(data)).unwrap();

      if (response.success) {
        toast.success(response.message, {
          autoClose: 1000,
          theme: "colored",
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          name="username"
          placeholder="Tên hiển thị"
          className="auth-input"
        />
        <Input
          {...register("email")}
          name="email"
          placeholder="Email"
          className="auth-input"
        />
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

        <Button size="lg" className="text-md cursor-pointer p-6 font-bold">
          {loading && <Spinner />}
          Đăng ký
        </Button>

        <div className="flex items-center justify-center gap-1">
          Bạn đã có tài khoản?
          <Link to={"/login"} className="font-semibold">
            Đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};
export default Register;
