import { useEffect, useState } from "react";
import { useAppStore } from "../../store/AppStoreProvider";
import { observer } from "mobx-react-lite";

const Switcher = observer(() => {
  const store = useAppStore();
  const [selectedOption, setSelectedOption] = useState<"mg/dL" | "mmol/L">(
    store.measurementUnit
  );

  const handleOptionClick = () => {
    setSelectedOption(selectedOption === "mg/dL" ? "mmol/L" : "mg/dL");
  };

  useEffect(() => {
    store.switchMeasurementUnit(selectedOption);
  }, [selectedOption]);

  return (
    <div
      onClick={handleOptionClick}
      className="w-36 p-0.5 h-8 rounded-full bg-lightPurple dark:bg-boxdark-2 justify-start items-center inline-flex cursor-pointer"
    >
      <div
        className={`p-0.5 w-18 h-7 rounded-full bg-lightPurple dark:bg-boxdark-2 justify-center text-black items-center gap-2.5 flex ${
          selectedOption === "mmol/L"
            ? "bg-lightPurple dark:bg-boxdark-2"
            : "bg-purple dark:bg-purple text-white"
        }`}
      >
        <div className="text-center text-base font-semibold leading-normal">
          mg/dL
        </div>
      </div>
      <div
        className={`p-0.5 w-18 h-7 rounded-full bg-lightPurple dark:bg-boxdark-2 text-black justify-center items-center gap-2.5 flex ${
          selectedOption === "mg/dL"
            ? "bg-lightPurple dark:bg-boxdark-2"
            : "bg-purple dark:bg-purple text-white"
        }`}
      >
        <div className="text-center text-base font-bold leading-normal">
          mmol/L
        </div>
      </div>
    </div>
  );
});

export default Switcher;
