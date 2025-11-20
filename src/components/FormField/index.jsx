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
  );
};
export default FormField;
