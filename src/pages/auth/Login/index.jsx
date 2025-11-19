import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import {
  loadingSelector as loginLoadingSelector,
  useCurrentUser,
} from "@/features/auth";
import { login } from "@/services/auth/authService";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const loading = useSelector(loginLoadingSelector);
  const currentUser = useCurrentUser();
  const [value, password] = watch(["login", "password"]);
  const isValid = Boolean(value && password);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      if (response.success) {
        toast.success(response.message, {
          autoClose: 1000,
          theme: "colored",
          position: "top-right",
        });
      }

      const { access_token, refresh_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] text-center">
        <h1 className="mb-3 text-3xl font-bold">Đăng nhập</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("login")}
            name="login"
            placeholder="Tên người dùng, số điện thoại hoặc email"
            className="rounded-xl bg-gray-100 py-7 font-semibold shadow-none placeholder:font-semibold"
          />
          <Input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="rounded-xl bg-gray-100 py-7 shadow-none placeholder:font-semibold"
          />

          <Button
            disabled={!isValid}
            size="lg"
            className="text-md cursor-pointer p-6 font-bold"
          >
            {loading && <Spinner />}
            Đăng nhập
          </Button>

          <div className="flex flex-col justify-center gap-3">
            <Link to={"/forgot-password"} className="text-sm font-semibold">
              Quên mật khẩu?
            </Link>
            <span className="text-sm text-gray-600">hoặc</span>
            <Link to={"/register"} className="text-sm font-semibold">
              Đăng ký tài khoản
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
