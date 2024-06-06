import { useState } from "react";

// Add a new prop 'onCheckedChange' which is a function that receives a boolean
const CheckboxFour = ({
  value, 
  title, 
  isCheked,
  onCheckedChange
}) => {
  const [Checked, setChecked] = useState<boolean>(isCheked);

  // Call onCheckedChange with the new checked state whenever it changes
  const handleChange = () => {
    const newCheckedState = !Checked;
    setChecked(newCheckedState);

    if (onCheckedChange) {
      onCheckedChange(newCheckedState);
    }
  };

  return (
    <div>
      <label
        htmlFor="checkboxLabelFour"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelFour"
            className="sr-only"
            onChange={handleChange}
          />
          {Checked ?
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="7.5" stroke="#8460B3"/>
            <circle cx="12" cy="12" r="5" fill="#8460B3"/>
            </svg>
            :
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="7.5" stroke="#A09FA7"/>
            </svg>
          }

        </div>
        <p className="text-sm">{title ? title : "no title"}</p>
      </label>
    </div>
  );
};

export default CheckboxFour;