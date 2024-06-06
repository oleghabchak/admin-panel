import React, { useEffect, useRef } from "react";
import Button from "./UiElements/Button";
import down from "./../assets/icon/icon-arrow-down.svg";
import up from "./../assets/icon/icon-arrow-up.svg";
import square from "./../assets/icon/Square.svg";
import squareFill from "./../assets/icon/SquareFill.svg";
import ratio from "./../assets/icon/ratio.svg";
import ratioFill from "./../assets/icon/ratio-fill.svg";

interface DropdownProps {
  id: number;
  title: string;
  multiple?: boolean;
  isOpen?: boolean | number;
  onOpen?: (id: number) => void;
  onClose?: () => void;
  selected?: string;
  setSelected?: ((value: string) => void) | undefined;
  apply?: () => void;
  values: { value: string | null; label: string }[];
}

const Select: React.FC<DropdownProps> = ({
  values,
  selected,
  setSelected,
  id,
  title,
  apply,
  multiple = false,
  isOpen,
  onOpen,
  onClose,
}) => {
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);


  useEffect(() => {

    const closeDropdown = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        trigger.current &&
        !trigger.current.contains(e.target)
      ) {
        if (onClose) onClose();
      }
    };

    if (multiple) {
      document.body.addEventListener("click", closeDropdown);
      return () => {
        document.body.removeEventListener("click", closeDropdown);
      };
    }
  }, [onClose]);

  return (
    <div className="relative z-50">
      <div>
        <select className="hidden" id={id}>
          {values.map((value, index) => (
            <option key={index} value={value.value}>
              {value.label}
            </option>
          ))}
        </select>

        <div className="flex flex-col items-center">
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div
                ref={trigger}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isOpen === id) {
                   onClose?.();
                  } else {
                    onOpen?.(id);
                  }
                }}
                className="w-full"
              >
                <div className="border w-40 flex rounded-lg bg-white h-11 border-lightGrey py-2 pl-3 pr-3 outline-none transition focus:border-purple active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <div className="flex flex-auto w-27 flex-wrap gap-3">
                    <div className="flex-1">
                      <p className="h-full placeholder-black font-semibold appearance-none bg-transparent p-1 px-2 outline-none ">
                        {title}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                    <button
                      type="button"
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      {isOpen === id ? <img src={up} /> : <img src={down} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-40 px-4">
                <div
                  className={`max-h-select absolute top-full left-0 z-40 w-40 overflow-y-auto rounded-lg border border-lightGrey bg-white shadow dark:bg-form-input ${
                    isOpen === id ? "" : "hidden"
                  }`}
                  ref={dropdownRef}
                >
                  <div className="flex items-center content-center justify-center w-full flex-col mb-2">
                    {values.length > 0 ? (
                      values.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => setSelected(option.value)}
                        >
                          <div className="w-40 cursor-pointer hover:bg-primary/5 dark:border-form-strokedark">
                            <div className="relative flex w-40 items-center border-l-2 border-transparent p-2 pl-2">
                              <div className="w-full mx-2 leading-6">
                                {multiple ? (
                                  <div className="flex w-full relative justify-start items-center">
                                    {selected === option.value ? (
                                      <img src={squareFill} />
                                    ) : (
                                      <img src={square} />
                                    )}
                                    <p className="text-sm">{option.label}</p>
                                  </div>
                                ) : (
                                  <div className="flex w-full relative justify-start items-center">
                                    {selected === option.value ? (
                                      <img src={ratioFill} />
                                    ) : (
                                      <img src={ratio} />
                                    )}
                                    <p className="text-sm">{option.label}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No options available</div>
                    )}
                    {multiple && (
                      <Button
                        onClick={() => {
                          apply();
                          onClose();
                        }}
                        size="small"
                        variant="primary"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
