import { Input } from "@/components/ui/input";
import { FC } from "react";
import { FormWrapperHOC } from "../_Templates";
import { cn } from "@/lib/utils";
import { iInputFieldProps } from "@/types/interface";

export const InputField: FC<iInputFieldProps> = FormWrapperHOC(
  ({
    id,
    type,
    placeholder,
    value,
    onChange,
    required,
    disabled,
    accept,
    className,
  }) => {
    return (
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // remove blue border on input field when focused
        className={cn("focus-visible:ring-[none]", className)}
        required={required}
        disabled={disabled}
        accept={accept}
      />
    );
  },
);
