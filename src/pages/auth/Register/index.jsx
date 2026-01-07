import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { loadingSelector } from "@/features/auth";
import { register as registerService } from "@/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/auth";
import FormField from "@/components/FormField";
import { useEffect } from "react";
import { toast } from "@/utils/toast";

const Register = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, trigger, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const loading = useSelector(loadingSelector);

  const email = watch("email");
  const username = watch("username");

  useEffect(() => {
    if (email) {
      trigger("email");
    }
  }, [email, trigger]);

  useEffect(() => {
    if (username) {
      trigger("username");
    }
  }, [username, trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerService(data)).unwrap();
      if (response.success) {
        toast.success("Vui lòng kiểm tra email để xác thực tài khoản", {
          theme: "colored",
          autoClose: 1500,
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại", {
        theme: "colored",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={control}
          placeholder="Tên hiển thị"
        />
        <FormField name="email" control={control} placeholder="Email" />
        <FormField
          name="password"
          type="password"
          control={control}
          placeholder="Mật khẩu"
        />
        <FormField
          name="password_confirmation"
          control={control}
          placeholder="Xác nhận mật khẩu"
          type="password"
        />

        <Button size="lg" className="text-md p-6 font-bold">
          {loading && <Spinner />}
          Đăng ký
        </Button>
        <Link
          to={"/login"}
          className="ml-1 text-sm font-semibold dark:text-gray-300 dark:hover:text-white"
        >
          Bạn đã có tài khoản? Đăng nhập
        </Link>
      </form>
    </>
  );
};
export default Register;
