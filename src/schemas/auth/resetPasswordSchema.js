import * as yup from "yup";

// Login schema
export const resetSchema = yup.object({
  password: yup.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp"),
});
