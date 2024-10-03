import { iTextAreaFieldProps } from "@/types/interface";
import { Textarea } from "../../ui/textarea";
import { FormWrapperHOC } from "../_Templates";

export const TextAreaField = FormWrapperHOC(
  ({
    required,
    placeholder,
    value,
    onChange,
    id,
    disabled,
    rows,
  }: iTextAreaFieldProps) => {
    return (
      <Textarea
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={id}
        id={id}
        rows={rows}
      />
    );
  },
);
