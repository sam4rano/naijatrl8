import { useState } from "react";

// eslint-disable-next-line react/prop-types
const InputFormat = ({ onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState("text");

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    onSelectOption(option);
  };

  return (
    <form>
      <select
        className="text-primary outline outline-offset-0 rounded-full px-lg h-[30px] outline-1"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="text">text</option>
        <option value="speech">speech</option>
      </select>
    </form>
  );
};

export default InputFormat;
