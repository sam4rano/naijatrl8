import React from "react";
import ClipBoard from "../assets/Copy.svg"

const InputProps = () => {
  return (
    <div className="absolute pl-[180px] pt-[90px] flex flex-col">
      <img src={ClipBoard} alt="clipboard" className="w-[100px]" />
      <p className="text-center text-[12px]">Paste your text here</p>
    </div>
  );
};

export default InputProps;
