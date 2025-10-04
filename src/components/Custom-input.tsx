import { Control, useController } from "react-hook-form";
interface CustomInputProps {
  type: "email" | "password" | "text" |"number" |"textarea";
  label: string;
  name: string;
  required: Boolean;
  placeholder: string;
  control: Control<any>;
}
const CustomInput = ({
  type,
  label,
  name,
  placeholder,
  control,
  required,
}: CustomInputProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-black font-medium text-sm">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
        {type === "textarea" ? (
         <div className="relative w-full">
        <textarea
          placeholder={placeholder}
          {...field}
          className="w-full h-[45px] px-2 border bg-white text-slate-900 placeholder:text-slate-700"
        />
      </div>
        ):(

          <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          {...field}
          className="w-full h-[45px] px-2 bg-white border text-slate-900 placeholder:text-slate-700"
        />
      </div>
        )}
      
      
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default CustomInput;
