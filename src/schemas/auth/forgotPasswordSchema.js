import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});
