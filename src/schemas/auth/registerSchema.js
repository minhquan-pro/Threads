import { checkExistEmail, checkExistUsername } from "@/services/auth";
import { createAsyncValidator } from "@/utils";
import * as yup from "yup";

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(REGEX_EMAIL, {
    name: "email",
    message,
    excludeEmptyString: true,
  });
});

const createCache = () => ({ value: null, available: true });

const createRegisterSchema = () => {
  const usernameCache = createCache();
  const emailCache = createCache();

  return yup.object({
    username: yup
      .string("HELLO")
      .trim()
      .required("Trường này là bắt buộc")
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Tên người dùng chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang",
      )
      .test(
        "username",
        "Tên đã tồn tại",
        createAsyncValidator(usernameCache, checkExistUsername),
      ),
    email: yup
      .string()
      .trim()
      .required("Trường này là bắt buộc")
      .email("Sai định dạng email")
      .test(
        "email",
        "Email đã tồn tại, chọn email khác",
        createAsyncValidator(emailCache, checkExistEmail),
      ),
    password: yup
      .string()
      .required("Trường này là bắt buộc")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp"),
  });
};

// Register schema
export const registerSchema = createRegisterSchema();
