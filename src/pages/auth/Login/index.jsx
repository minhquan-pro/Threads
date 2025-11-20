import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

import { loadingSelector, useCurrentUser } from "@/features/auth";
import { login } from "@/services/auth/authService";
import { loginSchema } from "@/utils/validators";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, watch, control, setError } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const loading = useSelector(loadingSelector);
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
      setError("password", {
        type: "invalid",
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="login"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  {...register("login")}
                  aria-invalid={fieldState.invalid}
                  placeholder="Tên người dùng, số điện thoại hoặc email"
                  className="auth-input"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-start font-semibold"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  {...register("password")}
                  aria-invalid={fieldState.invalid}
                  type="password"
                  placeholder="Mật khẩu"
                  className="auth-input"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-start font-semibold"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          disabled={!isValid || loading}
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
    </>
  );
};
export default Login;
