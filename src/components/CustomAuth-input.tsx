import React from "react";
import { useController, Control } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  type: "email" | "password" | "text";
  label: string;
  required?: boolean;
}
const CustomInput = ({
  name,
  control,
  placeholder,
  type,
  label,
  required,
}: CustomInputProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="w-full ">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}
      <div className="w-full relative">
        <input
          type={type}
          {...field}
          placeholder={placeholder}
          className="w-full h-[45px] bg-white px-3 text-slate-900 placeholder:text-slate-900 outline-none rounded-xl"
        />
      </div>
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default CustomInput;
