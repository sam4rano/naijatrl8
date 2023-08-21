// import InputFormat from "./Inputfiles/InputFormat"
// import InputLanguage from "./Inputfiles/InputLanguage";
// import InputProperties from "./inputfiles/InputProperties";
// import OutputFormat from "./outputfiles/outputFormat";
// import OutputLanguage from "./outputfiles/outputLanguage";
// import OutputProperties from "./outputfiles/outputProperties";
// import {Linspeaker, Loutspeaker} from "../icons/index"

// const InputOutputBox = () => {

//   return (
//     <div className="w-full h-full bg-gray p-lg">
//       <div className=" flex flex-row gap-md p-[20px]">
//         <InputFormat />
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           className="bg-gray"
//           fill="bg-white"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
//             stroke="#0A0A0A"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>

//         <OutputFormat />
//       </div>
//       <div className="h-[610px] max-w-[1200px] mx-auto bg-white rounded-[1.3rem]">
//         <div className="flex flex-row justify-evenly p-md bg-white">
//           <InputLanguage />
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             className="bg-white rounded-full outline outline-1 text-gray-20"
//             fill="bg-white"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
//               stroke="#0A0A0A"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <OutputLanguage />
//         </div>
//         <hr />
//         <div className="grid grid-cols-2 divide-x p-sm h-[500px] divide-opacity-10">
//           <div className="flex align-middle justify-center items-center">
//             <Linspeaker />
//           </div>
//           <div className="flex align-middle justify-center items-center">
//             <Loutspeaker />
//           </div>
//         </div>
//         <hr />
//         <div className="grid grid-cols-2 h-[20px] divide-x">
//           <InputProperties />
//           <OutputProperties />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InputOutputBox

import { useState } from "react";
import changeIcon from "../assets/Changeicon.png";

const TranslateForm = () => {
  const [source_language, setSource_language] = useState("en");
  const [target_language, setTarget_language] = useState("");
  const [source_text, setSource_text] = useState("");
  const [target_text, setTarget_text] = useState("");


  console.log('this is the source',source_language)
  console.log('this is the target',target_language);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://3.83.243.144/api/v1/translate/unregistered-trial",
      {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_language,
          target_language,
          source_text,
          target_text,
        }),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      const { target_text } = responseData.data;
      setTarget_text(target_text);
    } else {
      console.log("Error");
      const data = await response.json();
      console.log(data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[1000px] mx-auto p-[40px] "
    >
      <div className="flex flex-row bg-orange-200 w-full p-[10px] rounded-tr-[16px] rounded-tl-[16px] bg-white border-b-2 border-gray ">
        <div className="flex flex-row w-1/2 justify-center bg-white">
          <select
            id="input_language"
            name="input_language"
            value={source_language}
            onChange={(e) => setSource_language(e.target.value)}
          >
            <option value="en">English</option>
            <option value="yo">Yoruba</option>
            <option value="pcm">Pidgin</option>
          </select>
        </div>
        <img src={changeIcon} alt="change icon" className="w-[30px] h-[30px]" />
        <div className="flex flex-row w-1/2 pl-[100px] bg-white">
          <select
            id="output_language"
            name="output_language"
            value={target_language}
            onChange={(e) => setTarget_language(e.target.value)}
          >
            <option value="en">English</option>
            <option value="yo">Yoruba</option>
            <option value="pcm">Pidgin</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full h-[400px] bg-white pb-[10px]">
        <div className="flex flex-col w-1/2 h-[400px">
          <label htmlFor="source_text " className="p-[4px]">Source Text:</label>
          <div
            className="h-[400px] active:border-0"
            contentEditable
            id="source_text"
            name="source_text"
            value={source_text}
            onBlur={(e) => setSource_text(e.target.textContent)}
            suppressContentEditableWarning={true}
          >
            {source_text}
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-[400px] border-l-2 border-gray pb-[10px] ">
          <label htmlFor="output_text" className="p-[4px]">Output Text:</label>
          <div
            className="h-[400px] active:border-none "
            contentEditable
            id="target_text"
            name="target_text"
            value={target_text}
            suppressContentEditableWarning={true}
            // onChange={(e) => setTarget_text(e.target.value)}
            // onInput={(e) => setTarget_text(e.target.textContent)}
            onBlur={(e) => setTarget_text(e.target.textContent)}
          >
            {target_text}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="text-white h-6 mt-4 p-[8px] mt-[10px] mx-auto rounded-md bg-primary"
      >
        Translate
      </button>
    </form>
  );
};

export default TranslateForm;
