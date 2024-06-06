import React from "react";
import search from "../assets/icon/Search.svg"
interface InputProps {
  label?: string;
  placeholder: string;
  disabled?: boolean;
  error?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const InputField: React.FC<InputProps> = ({
  label,
  placeholder,
  disabled = false,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block text-black dark:text-white">{label}</label>
      )}
      <div className={`w-80 px-4 py-2 bg-white dark:bg-form-input rounded-xl border ${error ? 'border-red' : 'border-lightGrey hover:border-purple dark:border-form-strokedark  active:border-2'} justify-between items-center inline-flex`}>
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
          <img src={search}/>
          <input
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange} 
            className={`grow rounded-xl h-9 ${
              disabled
                ? "border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-red dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                : "bg-transparent text-black outline-none transition focus:border-primary dark:border-red  active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
            } ${error ? 'border-red' : ''}`}
          />
        </div>
      </div>
      {error && <p className="text-red text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;