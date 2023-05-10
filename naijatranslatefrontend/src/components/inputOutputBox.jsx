import InputFormat from "./Inputfiles/InputFormat"
import InputLanguage from "./Inputfiles/InputLanguage";
import InputProperties from "./inputfiles/InputProperties";
import OutputFormat from "./outputfiles/outputFormat";
import OutputLanguage from "./outputfiles/outputLanguage";
import OutputProperties from "./outputfiles/outputProperties";
import {Linspeaker, Loutspeaker} from "../icons/index"

const InputOutputBox = () => {
  return (
    <div className="w-full h-full bg-gray p-lg">
      <div className=" flex flex-row gap-md p-[20px]">
        <InputFormat />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="bg-gray"
          fill="bg-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <OutputFormat />
      </div>
      <div className="h-[610px] max-w-[1200px] mx-auto bg-white rounded-[1.3rem]">
        <div className="flex flex-row justify-evenly p-md bg-white">
          <InputLanguage />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="bg-white rounded-full outline outline-1 text-gray-20"
            fill="bg-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <OutputLanguage />
        </div>
        <hr />
        <div className="grid grid-cols-2 divide-x p-sm h-[500px] divide-opacity-10">
          <div className="flex align-middle justify-center items-center">
            <Linspeaker />
          </div>
          <div className="flex align-middle justify-center items-center">
            <Loutspeaker />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 h-[20px] divide-x">
          <InputProperties />
          <OutputProperties />
        </div>
      </div>
    </div>
  );
}

export default InputOutputBox