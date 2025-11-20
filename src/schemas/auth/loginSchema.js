import * as yup from "yup";

// Login schema
export const loginSchema = yup.object({
  login: yup
    .string()
    .trim()
    .required("Trường này là bắt buộc")
    .test("login", "Thông tin không hợp lệ", (value) => {
      const nameRegex = /^[A-Za-zÀ-ỹ0-9\s]+$/;
      const phoneRegex = /^(0|\+?\d{1,3})?\d{9,11}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const isName = nameRegex.test(value);
      const isPhone = phoneRegex.test(value);
      const isEmail = emailRegex.test(value);

      return isName || isPhone || isEmail;
    }),
  password: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
