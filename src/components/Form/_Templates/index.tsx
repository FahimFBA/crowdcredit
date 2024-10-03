import { Label } from "@/components/ui/label";
import { ComponentType, FC } from "react";
import { FaAsterisk } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { IFormWrapperHOCProps } from "@/types/interface";

export const FormWrapperHOC = <P extends object & IFormWrapperHOCProps>(
  Component: ComponentType<P>,
): FC<P> => {
  return (props: P) => {
    const { label, id, required, disabled, caption } = props;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label htmlFor={id} className={cn("flex gap-1", "capitalize")}>
            {required && <FaAsterisk className="w-2 text-red-500" />}
            {label}
          </Label>
        )}

        <Component {...props} />

        {!disabled ? (
          caption && <p className="text-sm text-gray-500">{caption}</p>
        ) : (
          <p className="text-sm text-gray-400">Field Disabled</p>
        )}
      </div>
    );
  };
};
