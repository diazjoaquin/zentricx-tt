import { InputType } from "@/app/utils/types/input.types";
import { ErrorMessage, Field } from "formik";

type FormFieldProps = {
  type: InputType;
  name: string;
  label: string;
  id: string;
  placeHolder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  label,
  id,
  placeHolder,
  required,
  options
}) => { 
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900 px-2" htmlFor={id}>
        {label}
      </label>
      { type === 'select' ? (
        <Field as="select" name={name} id={id} required={required} className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          {options?.map((option) => (
            <option className="px-2 py-1" key={option.value} value={option.value}>
              {option.label}
            </option>
        ))}
      </Field> 
      ) : (
      <Field
        type={type}
        name={name}
        id={id}
        placeholder={placeHolder}
        required={required}
        className="block w-full px-2 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />)}
      <div className="min-h-[15px]">
        <ErrorMessage 
          name={name}
          component="span"
          className="text-red-600 text-[10px] font-semibold"
        />
      </div>
    </div>
  )
}