import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FieldGroup } from "@/components/ui/field";

import { loadingSelector, useCurrentUser } from "@/features/auth";
import { login } from "@/services/auth/authService";
import { loginSchema } from "@/schemas/auth";
import FormField from "@/components/FormField";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, setError } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const loading = useSelector(loadingSelector);
  const currentUser = useCurrentUser();

  console.log(location);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      if (response.success) {
        toast.success(response.message, {
          autoClose: 1000,
          theme: "colored",
          position: "top-center",
        });
      }
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    } catch (error) {
      console.log(error);
      setError("password", {
        type: "invalid",
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });
    }
  };

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message, {
        autoClose: 1000,
        theme: "colored",
        position: "top-center",
      });
    }
  }, [location]);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            name="login"
            control={control}
            placeholder="Tên người dùng, số điện thoại hoặc email"
          />
          <FormField
            name="password"
            control={control}
            placeholder="Mật khẩu"
            type="password"
          />
        </FieldGroup>

        <Button size="lg" className="text-md p-6 font-bold">
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
    </>
  );
};
export default Login;
