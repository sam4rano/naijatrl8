import { useState } from "react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex flex-row gap-sm items-center space-x-2 pb-md">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5 text-primary"
      />
      <p className="text-dark">
        Send me news, promotions, and product emails
      </p>
    </label>
  );
};

export default Checkbox;
