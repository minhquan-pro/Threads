import { Controller } from "react-hook-form";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";

const FormField = ({ name, placeholder, control, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className="auth-input dark:border-[#2f2f2f]! dark:bg-[#242424]! dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500"
          />
          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-start font-semibold dark:text-red-400"
            />
          )}
        </Field>
      )}
    />
  );
};
export default FormField;
