import { checkExistEmail, checkExistUsername } from "@/services/auth";
import { debounceAsync } from "@/utils/debounceAsync";
import * as yup from "yup";

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(REGEX_EMAIL, {
    name: "email",
    message,
    excludeEmptyString: true,
  });
});

// Register schema
export const registerSchema = yup.object({
  username: yup.string().trim().required("Trường này là bắt buộc"),
  email: yup
    .string()
    .email("Sai định dạng email")
    .test(
      "email",
      "Email đã tồn tại, chọn email khác",
      async (value, context) => {
        console.log(context);

        try {
          await yup.string().email().validate(context.parent.email);
          const available = await debounceAsync(value, checkExistEmail);
          return available;
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          return false;
        }
      },
    ),
  password: yup.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp"),
});
